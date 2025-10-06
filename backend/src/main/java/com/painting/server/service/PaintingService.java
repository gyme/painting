package com.painting.server.service;

import com.painting.server.model.Painting;
import com.painting.server.repository.PaintingRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaintingService {

    private final PaintingRepository paintingRepository;

    @Transactional(readOnly = true)
    public Painting getPaintingByUrlKey(String urlKey) {
        log.debug("Fetching painting with urlKey: {}", urlKey);
        return paintingRepository.findByUrlKey(urlKey)
                .orElseThrow(() -> new EntityNotFoundException("Painting not found with urlKey: " + urlKey));
    }

    @Transactional
    public void incrementViewCount(String urlKey) {
        Painting painting = getPaintingByUrlKey(urlKey);
        painting.setViewCount(painting.getViewCount() + 1);
        paintingRepository.save(painting);
        log.debug("Incremented view count for painting: {}", urlKey);
    }

    @Transactional(readOnly = true)
    public Page<Painting> getAllPaintings(int page, int size, String sortBy, String direction) {
        Sort.Direction sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return paintingRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Painting> getPaintingsByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return paintingRepository.findByCategory(category, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Painting> getFeaturedPaintings(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return paintingRepository.findByFeatured(true, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Painting> searchPaintings(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return paintingRepository.searchByKeyword(keyword, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Painting> getMostPopular(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return paintingRepository.findMostPopular(pageable);
    }

    @Transactional(readOnly = true)
    public List<String> getAllCategories() {
        return paintingRepository.findAllCategories();
    }

    @Transactional
    public Painting createPainting(Painting painting) {
        log.info("Creating new painting: {}", painting.getTitle());
        return paintingRepository.save(painting);
    }

    @Transactional
    public Painting updatePainting(Long id, Painting paintingDetails) {
        Painting painting = paintingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Painting not found with id: " + id));
        
        painting.setTitle(paintingDetails.getTitle());
        painting.setDescription(paintingDetails.getDescription());
        painting.setCategory(paintingDetails.getCategory());
        painting.setTags(paintingDetails.getTags());
        painting.setImageUrl(paintingDetails.getImageUrl());
        painting.setThumbnailUrl(paintingDetails.getThumbnailUrl());
        painting.setDifficulty(paintingDetails.getDifficulty());
        painting.setColorPalette(paintingDetails.getColorPalette());
        painting.setSvgPath(paintingDetails.getSvgPath());
        painting.setFeatured(paintingDetails.getFeatured());
        
        return paintingRepository.save(painting);
    }

    @Transactional
    public void deletePainting(Long id) {
        if (!paintingRepository.existsById(id)) {
            throw new EntityNotFoundException("Painting not found with id: " + id);
        }
        paintingRepository.deleteById(id);
        log.info("Deleted painting with id: {}", id);
    }

    @Transactional(readOnly = true)
    public List<String> autocompletePaintings(String query, int limit) {
        log.debug("Autocomplete search for: {}", query);
        Page<Painting> results = paintingRepository.searchByKeyword(
            query, 
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "viewCount"))
        );
        return results.getContent().stream()
                .map(Painting::getTitle)
                .collect(java.util.stream.Collectors.toList());
    }
}
