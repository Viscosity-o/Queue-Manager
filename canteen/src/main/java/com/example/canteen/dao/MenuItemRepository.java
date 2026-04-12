package com.example.canteen.dao;

import com.example.canteen.entity.Canteen;
import com.example.canteen.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {
    List<MenuItem> findByCanteen(Canteen canteen);
    List<MenuItem> findByCanteenAndCategory(Canteen canteen, String category);
    List<MenuItem> findByCanteenAndIsAvailable(Canteen canteen, Boolean isAvailable);
}
