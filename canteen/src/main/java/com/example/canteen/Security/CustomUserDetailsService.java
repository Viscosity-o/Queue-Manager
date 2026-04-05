package com.example.canteen.Security;

import com.example.canteen.dao.Canteenrepo;
import com.example.canteen.dao.Studentrepo;
import com.example.canteen.entity.Canteen;
import com.example.canteen.entity.studentable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private Canteenrepo cr;

    @Autowired
    private Studentrepo st;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<studentable> student = st.findByEmail(email);
        if (student.isPresent()) {
            studentable s = student.get();
            return new User(
                    s.getEmail(),
                    s.getPasswordHash(),
                    List.of(new SimpleGrantedAuthority("ROLE_" + s.getRole().name()))
            );
        }

        Optional<Canteen> canteen = cr.findByEmail(email);
        if (canteen.isPresent()) {
            Canteen c = canteen.get();
            return new User(
                    c.getEmail(),
                    c.getPasswordHash(),
                    List.of(new SimpleGrantedAuthority("ROLE_" + c.getRole().name()))
            );
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
