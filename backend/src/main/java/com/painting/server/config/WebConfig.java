package com.painting.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

/**
 * Web Configuration for Performance Optimization
 * 
 * Adds HTTP caching headers for static resources and API responses
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Cache static resources (images, CSS, JS) for 7 days
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.maxAge(7, TimeUnit.DAYS)
                        .cachePublic());
    }

    /**
     * For production, add these response headers in your reverse proxy (Nginx/Apache)
     * or CDN (CloudFlare/CloudFront) for better performance:
     * 
     * API Responses:
     * - Cache-Control: public, max-age=300, s-maxage=600
     * - ETag: <hash>
     * - Vary: Accept-Encoding
     * 
     * Static Images:
     * - Cache-Control: public, max-age=31536000, immutable
     * - Content-Type: image/png (or image/jpeg)
     * - Vary: Accept-Encoding
     * 
     * Enable Compression:
     * - Content-Encoding: gzip (or br for Brotli)
     */
}

