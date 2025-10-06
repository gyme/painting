package com.painting.server.controller;

import com.painting.server.model.Painting;
import com.painting.server.service.PaintingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paintings")
@RequiredArgsConstructor
@Tag(name = "Paintings", description = "API for managing kid's paintings")
public class PaintingController {

    private final PaintingService paintingService;

    @GetMapping("/{urlKey}")
    @Operation(summary = "Get painting by URL key", description = "Returns a single painting by its URL key and increments view count")
    public ResponseEntity<Painting> getPaintingByUrlKey(@PathVariable String urlKey) {
        Painting painting = paintingService.getPaintingByUrlKey(urlKey);
        paintingService.incrementViewCount(urlKey);
        return ResponseEntity.ok(painting);
    }

    @GetMapping
    @Operation(summary = "Get all paintings", description = "Returns paginated list of all paintings")
    public ResponseEntity<Page<Painting>> getAllPaintings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        return ResponseEntity.ok(paintingService.getAllPaintings(page, size, sortBy, direction));
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Get paintings by category", description = "Returns paginated list of paintings by category")
    public ResponseEntity<Page<Painting>> getPaintingsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(paintingService.getPaintingsByCategory(category, page, size));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured paintings", description = "Returns paginated list of featured paintings")
    public ResponseEntity<Page<Painting>> getFeaturedPaintings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(paintingService.getFeaturedPaintings(page, size));
    }

    @GetMapping("/popular")
    @Operation(summary = "Get popular paintings", description = "Returns most viewed paintings")
    public ResponseEntity<Page<Painting>> getMostPopular(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(paintingService.getMostPopular(page, size));
    }

    @GetMapping("/search")
    @Operation(summary = "Search paintings", description = "Search paintings by keyword in title, description, or tags")
    public ResponseEntity<Page<Painting>> searchPaintings(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(paintingService.searchPaintings(keyword, page, size));
    }

    @GetMapping("/autocomplete")
    @Operation(summary = "Autocomplete search", description = "Get painting suggestions for autocomplete")
    public ResponseEntity<List<String>> autocompletePaintings(
            @RequestParam String query,
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(paintingService.autocompletePaintings(query, limit));
    }

    @GetMapping("/categories")
    @Operation(summary = "Get all categories", description = "Returns list of all available painting categories")
    public ResponseEntity<List<String>> getAllCategories() {
        return ResponseEntity.ok(paintingService.getAllCategories());
    }

    @PostMapping
    @Operation(summary = "Create new painting", description = "Creates a new painting entry")
    public ResponseEntity<Painting> createPainting(@Valid @RequestBody Painting painting) {
        Painting created = paintingService.createPainting(painting);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update painting", description = "Updates an existing painting")
    public ResponseEntity<Painting> updatePainting(
            @PathVariable Long id,
            @Valid @RequestBody Painting painting) {
        return ResponseEntity.ok(paintingService.updatePainting(id, painting));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete painting", description = "Deletes a painting by ID")
    public ResponseEntity<Void> deletePainting(@PathVariable Long id) {
        paintingService.deletePainting(id);
        return ResponseEntity.noContent().build();
    }
}
