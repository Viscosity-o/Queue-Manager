package com.example.canteen.services;

import com.example.canteen.entity.Canteen;

public interface Canteenservice {

    Canteen RegisterStaff(Canteen ct);
    Canteen GetStaffEmail(String email);

}
