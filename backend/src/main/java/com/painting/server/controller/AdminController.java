package com.painting.server.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin", description = "Admin operations for cache management")
@CrossOrigin(origins = "*")
public class AdminController {
    
    private final CacheManager cacheManager;
    
    public AdminController(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }
    
    @PostMapping("/cache/clear")
    @Operation(summary = "Clear all caches", description = "Clears all application caches including categories, paintings, etc.")
    public ResponseEntity<String> clearAllCaches() {
        log.info("Clearing all caches...");
        cacheManager.getCacheNames()
            .forEach(cacheName -> {
                var cache = cacheManager.getCache(cacheName);
                if (cache != null) {
                    cache.clear();
                    log.info("Cleared cache: {}", cacheName);
                }
            });
        return ResponseEntity.ok("All caches cleared successfully");
    }
    
    @PostMapping("/cache/clear/{cacheName}")
    @Operation(summary = "Clear specific cache", description = "Clears a specific cache by name (e.g. categories, paintings)")
    public ResponseEntity<String> clearSpecificCache(@PathVariable String cacheName) {
        log.info("Clearing cache: {}", cacheName);
        var cache = cacheManager.getCache(cacheName);
        if (cache != null) {
            cache.clear();
            return ResponseEntity.ok("Cache '" + cacheName + "' cleared successfully");
        } else {
            return ResponseEntity.badRequest().body("Cache '" + cacheName + "' not found");
        }
    }
    
    @GetMapping("/cache/list")
    @Operation(summary = "List all cache names", description = "Returns list of all available cache names")
    public ResponseEntity<?> listCaches() {
        return ResponseEntity.ok(cacheManager.getCacheNames());
    }
}



