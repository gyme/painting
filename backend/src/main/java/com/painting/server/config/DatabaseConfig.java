package com.painting.server.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        // If DATABASE_URL is set (production), convert it to JDBC format
        if (databaseUrl != null && databaseUrl.startsWith("postgres://")) {
            // Convert postgres:// to jdbc:postgresql://
            databaseUrl = databaseUrl.replace("postgres://", "jdbc:postgresql://");
            
            // Extract username, password, host, and database name
            // Format: postgres://username:password@host:port/database
            String[] parts = databaseUrl.replace("jdbc:postgresql://", "").split("@");
            String[] credentials = parts[0].split(":");
            String username = credentials[0];
            String password = credentials.length > 1 ? credentials[1] : "";
            String hostAndDb = parts[1];
            
            String jdbcUrl = "jdbc:postgresql://" + hostAndDb;
            
            return DataSourceBuilder.create()
                    .driverClassName("org.postgresql.Driver")
                    .url(jdbcUrl)
                    .username(username)
                    .password(password)
                    .build();
        } else if (databaseUrl != null && databaseUrl.startsWith("postgresql://")) {
            // Handle postgresql:// format too
            databaseUrl = databaseUrl.replace("postgresql://", "jdbc:postgresql://");
            
            String[] parts = databaseUrl.replace("jdbc:postgresql://", "").split("@");
            String[] credentials = parts[0].split(":");
            String username = credentials[0];
            String password = credentials.length > 1 ? credentials[1] : "";
            String hostAndDb = parts[1];
            
            String jdbcUrl = "jdbc:postgresql://" + hostAndDb;
            
            return DataSourceBuilder.create()
                    .driverClassName("org.postgresql.Driver")
                    .url(jdbcUrl)
                    .username(username)
                    .password(password)
                    .build();
        }
        
        // Otherwise, use the default configuration from application.yml (H2 for local)
        return DataSourceBuilder.create()
                .driverClassName(System.getProperty("spring.datasource.driver-class-name", "org.h2.Driver"))
                .url(System.getProperty("spring.datasource.url", "jdbc:h2:mem:painting_db;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE"))
                .username(System.getProperty("spring.datasource.username", "sa"))
                .password(System.getProperty("spring.datasource.password", ""))
                .build();
    }
}
