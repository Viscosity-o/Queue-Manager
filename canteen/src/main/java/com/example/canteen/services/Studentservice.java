package com.example.canteen.services;

import com.example.canteen.dao.Studentrepo;
import com.example.canteen.entity.studentable;
import org.springframework.beans.factory.annotation.Autowired;

public interface Studentservice {

    studentable registerStudent(studentable st);

    studentable getStudentByEmail(String email);


}
