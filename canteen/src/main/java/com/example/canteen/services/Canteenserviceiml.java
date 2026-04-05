package com.example.canteen.services;

import com.example.canteen.dao.Canteenrepo;
import com.example.canteen.entity.Canteen;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class Canteenserviceiml implements Canteenservice {
    @Autowired

    Canteenrepo cr;

    public Canteen RegisterStaff(Canteen ct){
        return cr.save(ct);
    }

    public Canteen GetStaffEmail(String email){
        return cr.findByEmail(email).orElse(null);
    }








}
