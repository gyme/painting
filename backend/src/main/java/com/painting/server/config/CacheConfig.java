package com.painting.server.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

/**
 * Cache Configuration for Performance Optimization
 * 
 * This enables caching for frequently accessed data:
 * - Categories list (rarely changes)
 * - Popular paintings (updates slowly)
 * - Featured paintings (updates slowly)
 * - Individual painting lookups by urlKey
 * 
 * For production, consider using Redis or Caffeine for:
 * - Distributed caching across multiple servers
 * - TTL (Time To Live) configuration
 * - Better memory management
 * - Cache eviction policies
 */
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        // Simple in-memory cache for now
        // For production with multiple instances, use Redis
        ConcurrentMapCacheManager cacheManager = new ConcurrentMapCacheManager();
        cacheManager.setCacheNames(Arrays.asList(
            "categories",      // Cache categories list (rarely changes)
            "paintings",       // Cache individual paintings
            "featuredPaintings", // Cache featured paintings list
            "popularPaintings",  // Cache popular paintings list
            "searchResults"    // Cache search results temporarily
        ));
        cacheManager.setAllowNullValues(false);
        return cacheManager;
    }
}

