package com.painting.server.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.util.logging.Logger;

@Configuration
public class DatabaseConfig {

    private static final Logger logger = Logger.getLogger(DatabaseConfig.class.getName());

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        logger.info("DATABASE_URL environment variable: " + (databaseUrl != null ? "SET" : "NOT SET"));
        
        // If DATABASE_URL is set (production), convert it to JDBC format
        if (databaseUrl != null && (databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://"))) {
            logger.info("Using PostgreSQL from DATABASE_URL");
            
            // Extract username, password, host, and database name
            // Format: postgres://username:password@host:port/database
            String urlWithoutProtocol = databaseUrl
                    .replace("postgres://", "")
                    .replace("postgresql://", "");
            
            String[] parts = urlWithoutProtocol.split("@");
            String[] credentials = parts[0].split(":");
            String username = credentials[0];
            String password = credentials.length > 1 ? credentials[1] : "";
            String hostAndDb = parts[1];
            
            String jdbcUrl = "jdbc:postgresql://" + hostAndDb;
            
            logger.info("PostgreSQL JDBC URL: " + jdbcUrl);
            logger.info("PostgreSQL Username: " + username);
            
            return DataSourceBuilder.create()
                    .driverClassName("org.postgresql.Driver")
                    .url(jdbcUrl)
                    .username(username)
                    .password(password)
                    .build();
        }
        
        // Otherwise, use H2 file-based database for local development (persists data)
        logger.info("Using H2 file-based database for local development");
        return DataSourceBuilder.create()
                .driverClassName("org.h2.Driver")
                .url("jdbc:h2:file:./painting;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE")
                .username("sa")
                .password("")
                .build();
    }
}
