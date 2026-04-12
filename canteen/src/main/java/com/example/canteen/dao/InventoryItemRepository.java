package com.example.canteen.dao;

import com.example.canteen.entity.Canteen;
import com.example.canteen.entity.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, UUID> {
    List<InventoryItem> findByCanteen(Canteen canteen);
    List<InventoryItem> findByCanteenAndStatus(Canteen canteen, String status);
    Long countByCanteen(Canteen canteen);
    Long countByCanteenAndStatus(Canteen canteen, String status);
}
