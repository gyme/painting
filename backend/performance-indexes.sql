-- Performance Optimization: Add Database Indexes
-- This dramatically improves query performance for large datasets
-- Run this on your production database

-- Index on url_key for fast lookups by URL (most common query)
CREATE INDEX IF NOT EXISTS idx_paintings_url_key ON paintings(url_key);

-- Index on category for category page queries
CREATE INDEX IF NOT EXISTS idx_paintings_category ON paintings(category);

-- Index on featured flag for featured paintings queries
CREATE INDEX IF NOT EXISTS idx_paintings_featured ON paintings(featured);

-- Index on view_count for popular paintings queries
CREATE INDEX IF NOT EXISTS idx_paintings_view_count ON paintings(view_count DESC);

-- Composite index for category + createdAt (used in category pages with sorting)
CREATE INDEX IF NOT EXISTS idx_paintings_category_created ON paintings(category, created_at DESC);

-- Composite index for featured + createdAt (used in featured pages with sorting)
CREATE INDEX IF NOT EXISTS idx_paintings_featured_created ON paintings(featured, created_at DESC) WHERE featured = true;

-- Index on created_at for general sorting
CREATE INDEX IF NOT EXISTS idx_paintings_created_at ON paintings(created_at DESC);

-- Full-text search indexes for better search performance
-- Note: These are PostgreSQL-specific. For H2, they'll be regular indexes.
CREATE INDEX IF NOT EXISTS idx_paintings_title_search ON paintings USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_paintings_description_search ON paintings USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_paintings_tags_search ON paintings USING gin(to_tsvector('english', tags));

-- Composite index for search queries (title + description + tags)
-- This helps with LIKE queries, though full-text search is better
CREATE INDEX IF NOT EXISTS idx_paintings_search_lower_title ON paintings(LOWER(title));
CREATE INDEX IF NOT EXISTS idx_paintings_search_lower_desc ON paintings(LOWER(description));
CREATE INDEX IF NOT EXISTS idx_paintings_search_lower_tags ON paintings(LOWER(tags));

-- Show index information
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'paintings'
ORDER BY indexname;

-- Analyze table for query planner optimization
ANALYZE paintings;

-- Show table statistics
SELECT 
    COUNT(*) as total_paintings,
    COUNT(DISTINCT category) as total_categories,
    COUNT(*) FILTER (WHERE featured = true) as featured_count,
    AVG(view_count) as avg_views,
    MAX(view_count) as max_views
FROM paintings;

