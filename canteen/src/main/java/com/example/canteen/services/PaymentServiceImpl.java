package com.example.canteen.services;

import com.example.canteen.dao.Orderrepo;
import com.example.canteen.dto.OrderRequest;
import com.example.canteen.entity.Order;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @Autowired
    private Orderrepo orderrepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public JSONObject createRazorpayOrder(OrderRequest orderRequest) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        JSONObject orderRequestJson = new JSONObject();
        orderRequestJson.put("amount", (int) (orderRequest.getAmount() * 100)); // Amount in paise
        orderRequestJson.put("currency", orderRequest.getCurrency());
        orderRequestJson.put("receipt", "order_" + System.currentTimeMillis());

        com.razorpay.Order razorpayOrder = razorpayClient.orders.create(orderRequestJson);

        // Save order to database
        try {
            String itemsJson = objectMapper.writeValueAsString(orderRequest.getItems());
            
            Order order = Order.builder()
                    .studentId(orderRequest.getStudentId())
                    .canteenId(orderRequest.getCanteenId())
                    .razorpayOrderId(razorpayOrder.get("id"))
                    .amount(orderRequest.getAmount())
                    .currency(orderRequest.getCurrency())
                    .status(Order.OrderStatus.CREATED)
                    .items(itemsJson)
                    .build();

            orderrepo.save(order);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save order", e);
        }

        return razorpayOrder.toJson();
    }

    @Override
    public boolean verifyPaymentSignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        try {
            String payload = razorpayOrderId + "|" + razorpayPaymentId;
            
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(razorpayKeySecret.getBytes(), "HmacSHA256");
            mac.init(secretKeySpec);
            
            byte[] hash = mac.doFinal(payload.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            
            return hexString.toString().equals(razorpaySignature);
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Order updateOrderAfterPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        Order order = orderrepo.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)) {
            order.setRazorpayPaymentId(razorpayPaymentId);
            order.setRazorpaySignature(razorpaySignature);
            order.setStatus(Order.OrderStatus.PAID);
            order.setPaymentMethod("UPI");
            order.setUpdatedAt(LocalDateTime.now());
            return orderrepo.save(order);
        } else {
            order.setStatus(Order.OrderStatus.FAILED);
            order.setUpdatedAt(LocalDateTime.now());
            orderrepo.save(order);
            throw new RuntimeException("Payment verification failed");
        }
    }
}
