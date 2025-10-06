package com.painting.server.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.logging.Logger;

@Configuration
public class DataInitializer {

    private static final Logger logger = Logger.getLogger(DataInitializer.class.getName());

    @Bean
    public CommandLineRunner initializeData(JdbcTemplate jdbcTemplate) {
        return args -> {
            String databaseUrl = System.getenv("DATABASE_URL");
            
            // Only initialize sample data for local H2 database
            if (databaseUrl == null || (!databaseUrl.startsWith("postgres://") && !databaseUrl.startsWith("postgresql://"))) {
                logger.info("Local H2 database detected - initializing with sample data");
                
                try {
                    // Check if table is empty
                    Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM paintings", Integer.class);
                    
                    if (count != null && count == 0) {
                        logger.info("Table is empty - inserting sample data");
                        
                        // Read and execute data.sql
                        String sql = new String(getClass().getClassLoader()
                                .getResourceAsStream("data.sql").readAllBytes());
                        
                        // Split by semicolon and execute each statement
                        String[] statements = sql.split(";");
                        for (String statement : statements) {
                            if (!statement.trim().isEmpty()) {
                                jdbcTemplate.execute(statement.trim());
                            }
                        }
                        
                        logger.info("Sample data initialized successfully");
                    } else {
                        logger.info("Table already contains data - skipping initialization");
                    }
                } catch (Exception e) {
                    logger.warning("Could not initialize sample data: " + e.getMessage());
                }
            } else {
                logger.info("PostgreSQL database detected - skipping sample data initialization (use bulk-import-paintings.js instead)");
            }
        };
    }
}
