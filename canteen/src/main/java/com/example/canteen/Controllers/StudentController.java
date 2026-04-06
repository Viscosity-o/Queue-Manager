   package com.example.canteen.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/Student")
public class StudentController {
    @GetMapping("/dash")
    public String studentdash(){
        return "welcome to the student dashboard";
    }

    @GetMapping("/info")
    public String info(){
        return "Student endpoint is working";
    }
}
