package com.example.canteen.services;

import com.example.canteen.dto.OrderRequest;
import com.example.canteen.entity.Order;
import com.razorpay.RazorpayException;
import org.json.JSONObject;

public interface PaymentService {
    JSONObject createRazorpayOrder(OrderRequest orderRequest) throws RazorpayException;
    boolean verifyPaymentSignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature);
    Order updateOrderAfterPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature);
}
