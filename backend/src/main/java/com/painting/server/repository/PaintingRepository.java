package com.painting.server.repository;

import com.painting.server.model.Painting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaintingRepository extends JpaRepository<Painting, Long> {

    Optional<Painting> findByUrlKey(String urlKey);

    Page<Painting> findByCategory(String category, Pageable pageable);

    Page<Painting> findByFeatured(Boolean featured, Pageable pageable);

    @Query("SELECT DISTINCT p.category FROM Painting p ORDER BY p.category")
    List<String> findAllCategories();

    @Query("SELECT p FROM Painting p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.tags) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Painting> searchByKeyword(String keyword, Pageable pageable);

    @Query("SELECT p FROM Painting p ORDER BY p.viewCount DESC")
    Page<Painting> findMostPopular(Pageable pageable);
}
