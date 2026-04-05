package com.example.canteen.services;

import com.example.canteen.dao.Studentrepo;
import com.example.canteen.entity.studentable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Studentserviceiml implements Studentservice{
    @Autowired

    private Studentrepo sr;

    @Override
    public studentable registerStudent(studentable st){
        return sr.save(st);
        }


        public studentable getStudentByEmail(String email){
        return sr.findByEmail(email).orElse(null);
        }





}
