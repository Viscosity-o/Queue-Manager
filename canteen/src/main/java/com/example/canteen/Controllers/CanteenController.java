package com.example.canteen.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/Canteen")
public class CanteenController {
    @GetMapping("/dash")
    public String Canteendash(){
        return"welcome to canteen";
    }
    @GetMapping("/info")
    public String info(){
        return "Canteen endpoint is working";
    }


}
