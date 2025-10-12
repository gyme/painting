import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { useState, useMemo, useEffect } from 'react'
import { paintingsApi } from '../api/paintings'
import PaintingCard from '../components/PaintingCard'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import { getCategoryContent } from '../data/categoryContent'

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Description = styled.div`
  max-width: 1200px;
  margin: 3rem auto 2rem;
  padding: 3rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: 1.8rem;
    color: #333;
    margin: 2rem 0 1rem 0;
    font-weight: 700;
    
    &:first-of-type {
      margin-top: 0;
    }
  }
  
  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-size: 1.05rem;
    
    strong {
      color: #333;
      font-weight: 600;
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
    
    li {
      padding: 0.75rem 0;
      padding-left: 2rem;
      position: relative;
      color: #555;
      line-height: 1.6;
      font-size: 1.05rem;
      
      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #667eea;
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
  
  @media (max-width: 768px) {
    margin: 2rem 0 1rem;
    padding: 1.5rem;
    border-radius: 15px;
    
    h2 {
      font-size: 1.4rem;
      margin: 1.5rem 0 0.75rem 0;
      
      &:first-of-type {
        margin-top: 0;
      }
    }
    
    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    ul {
      margin: 1rem 0;
      
      li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        font-size: 0.95rem;
        
        &:before {
          font-size: 1rem;
        }
      }
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const Loading = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const Error = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(231, 76, 60, 0.9);
  color: white;
  border-radius: 20px;
  font-size: 1.5rem;
  font-weight: 600;
`

// Empty styled component removed - using EmptyState instead

const FiltersContainer = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(10px);

  @media (max-width: 1024px) {
    padding: 1.25rem 1rem;
    border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  }
`

const FiltersRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    gap: 1rem;
  }
`

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 1024px) {
    width: 100%;
    
    &:last-of-type {
      flex-direction: column;
      align-items: stretch;
      gap: 0.625rem;
    }
  }
`

const FilterLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #636e72;
  white-space: nowrap;
  
  @media (max-width: 1024px) {
    display: none;
  }
`

const Select = styled.select`
  padding: 0.6rem 2.5rem 0.6rem 0.75rem;
  border: 2px solid #dfe6e9;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #2d3436;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23636e72' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;

  &:hover {
    border-color: #667eea;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  @media (max-width: 1024px) {
    width: 100%;
    font-size: 1rem;
    padding: 0.875rem 2.5rem 0.875rem 1rem;
    border-radius: 12px;
    border-color: #e3e8ef;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    font-weight: 500;
  }
`

const FilterCheckboxGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  
  @media (max-width: 1024px) {
    width: 100%;
    gap: 0.625rem;
  }
`

const CheckboxLabel = styled.label<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: ${props => props.$isActive ? 'white' : '#636e72'};
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.$isActive ? '#667eea' : 'white'};
  font-weight: ${props => props.$isActive ? '600' : '500'};
  white-space: nowrap;
  border: 2px solid ${props => props.$isActive ? '#667eea' : '#dfe6e9'};
  user-select: none;

  &:hover {
    background: ${props => props.$isActive ? '#5568d3' : 'rgba(102, 126, 234, 0.05)'};
    border-color: ${props => props.$isActive ? '#5568d3' : '#667eea'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #667eea;
  }
  
  @media (max-width: 1024px) {
    flex: 1;
    justify-content: center;
    font-size: 0.875rem;
    padding: 0.75rem 0.5rem;
    gap: 0;
    border-radius: 12px;
    border-width: 2px;
    border-color: ${props => props.$isActive ? '#667eea' : '#e3e8ef'};
    background: ${props => props.$isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
    box-shadow: ${props => props.$isActive ? '0 4px 12px rgba(102, 126, 234, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.04)'};
    font-weight: ${props => props.$isActive ? '600' : '500'};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.$isActive ? '0 6px 16px rgba(102, 126, 234, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.08)'};
    }

    input[type="checkbox"] {
      display: none;
    }
  }
`

const SearchInput = styled.input`
  padding: 0.6rem 0.75rem;
  border: 2px solid #dfe6e9;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #2d3436;
  background: white;
  transition: all 0.2s ease;
  min-width: 200px;
  flex: 1;

  &::placeholder {
    color: #b2bec3;
  }

  &:hover {
    border-color: #667eea;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  @media (max-width: 1024px) {
    width: 100%;
    min-width: 0;
    font-size: 1rem;
    padding: 0.875rem 1rem;
    border-radius: 12px;
    border-color: #e3e8ef;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    
    &:focus {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    }
  }
`

const FilterActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-left: auto;
  
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
    gap: 0;
  }
`

const ClearButton = styled.button`
  padding: 0.6rem 1rem;
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    border-color: #e8e8e8;
    color: #b2bec3;
  }
  
  @media (max-width: 1024px) {
    width: 100%;
    font-size: 0.95rem;
    padding: 0.875rem;
    margin-top: 0.75rem;
    border-radius: 12px;
    border-color: ${props => props.disabled ? '#e8e8e8' : '#667eea'};
    background: ${props => props.disabled ? 'transparent' : 'transparent'};
    box-shadow: ${props => props.disabled ? 'none' : '0 2px 8px rgba(102, 126, 234, 0.15)'};
    
    &:hover:not(:disabled) {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
      transform: translateY(-2px);
    }
  }
`

const ActiveFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #636e72;
  font-size: 0.85rem;
  font-weight: 500;
  
  @media (max-width: 1024px) {
    width: 100%;
    justify-content: center;
    order: -1;
    padding-bottom: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 0.8rem;
    color: #95a5a6;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, transparent, #667eea, transparent);
      border-radius: 2px;
    }
  }
`

const FilterBadge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.25);
  
  @media (max-width: 1024px) {
    padding: 0.25rem 0.625rem;
    font-size: 0.85rem;
  }
`

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: #dfe6e9;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    display: none;
  }
`

const MobileLabel = styled.div`
  display: none;
  
  @media (max-width: 1024px) {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    color: #95a5a6;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.625rem;
    text-align: center;
  }
`

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
`

const ResultCount = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3436;

  span {
    color: #667eea;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  margin: 2rem 0;
`

const EmptyTitle = styled.h3`
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 1rem;
`

const EmptyText = styled.p`
  font-size: 1.1rem;
  color: #636e72;
  margin-bottom: 1.5rem;
`

function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  // Initialize state from URL parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [difficultyFilter, setDifficultyFilter] = useState<number[]>(() => {
    const param = searchParams.get('difficulty')
    return param ? param.split(',').map(Number) : []
  })

  const { data, isLoading, error } = useQuery(
    ['categoryPaintings', category],
    () => paintingsApi.getPaintingsByCategory(category!, 0, 100), // Fetch more for better filtering
    {
      staleTime: 5 * 60 * 1000,
    }
  )

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    if (searchQuery) params.set('search', searchQuery)
    if (sortBy !== 'newest') params.set('sort', sortBy)
    if (difficultyFilter.length > 0) params.set('difficulty', difficultyFilter.join(','))
    
    setSearchParams(params, { replace: true })
  }, [searchQuery, sortBy, difficultyFilter, setSearchParams])

  // Enhanced filtering and sorting logic
  const filteredAndSortedPaintings = useMemo(() => {
    if (!data?.content) return []

    let filtered = [...data.content]

    // 1. Apply search filter (searches in title, description, tags)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.toLowerCase().includes(query)
      )
    }

    // 2. Apply difficulty filter
    if (difficultyFilter.length > 0) {
      filtered = filtered.filter(p => difficultyFilter.includes(p.difficulty))
    }

    // 3. Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.viewCount - a.viewCount)
        break
      case 'easy-first':
        filtered.sort((a, b) => a.difficulty - b.difficulty || b.viewCount - a.viewCount)
        break
      case 'hard-first':
        filtered.sort((a, b) => b.difficulty - a.difficulty || b.viewCount - a.viewCount)
        break
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return filtered
  }, [data, searchQuery, difficultyFilter, sortBy])

  const toggleDifficultyFilter = (difficulty: number) => {
    setDifficultyFilter(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSortBy('newest')
    setDifficultyFilter([])
  }

  const hasActiveFilters = searchQuery || difficultyFilter.length > 0 || sortBy !== 'newest'
  const activeFilterCount = (searchQuery ? 1 : 0) + difficultyFilter.length + (sortBy !== 'newest' ? 1 : 0)

  if (isLoading) {
    return <Loading>🎨 Loading {category} paintings... ✨</Loading>
  }

  if (error) {
    return <Error>😢 Oops! Something went wrong. Please try again later.</Error>
  }

  const getCategoryEmoji = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'animals': return '🐶'
      case 'nature': return '🌳'
      case 'vehicles': return '🚗'
      case 'fantasy': return '🦄'
      default: return '🎨'
    }
  }

  const categoryDescriptions: { [key: string]: string } = {
    animals: 'Discover amazing animal coloring pages! Color cute puppies, wild lions, elephants, giraffes, and more. Perfect for animal-loving kids.',
    nature: 'Explore beautiful nature coloring pages! Color trees, flowers, beaches, rivers, and stunning landscapes. Bring nature to life with colors!',
    vehicles: 'Rev up with exciting vehicle coloring pages! Color cars, trucks, buses, trains, and more. Perfect for kids who love transportation!',
    fantasy: 'Enter a magical world with fantasy coloring pages! Color unicorns, dragons, castles, and magical creatures. Let imagination soar!',
    characters: 'Color your favorite characters! From Pikachu to Disney princesses, bring beloved characters to life with your creativity!',
    mandalas: 'Find peace and focus with beautiful mandala coloring pages! Symmetrical patterns perfect for mindfulness and relaxation.',
    sports: 'Get active with sports coloring pages! Soccer, basketball, swimming, and more athletic activities await.',
    holidays: 'Celebrate year-round with holiday coloring pages! Christmas, Halloween, Easter, and all your favorite special occasions.'
  }
  
  const content = getCategoryContent(category)

  return (
    <>
      <SEO
        title={`${category} Coloring Pages - Free Printable for Kids`}
        description={content?.description || categoryDescriptions[category?.toLowerCase() || ''] || `Browse our collection of ${category} coloring pages for kids. Free printable coloring sheets perfect for children of all ages!`}
        keywords={`${category} coloring pages, ${category} coloring sheets, kids ${category}, printable ${category}, free ${category} coloring, ${category} activities for kids`}
      />
      <Container>
        <Breadcrumbs items={[
          { label: 'Home', path: '/' },
          { label: category || 'Category' }
        ]} />
        <Header>
          <Title>{getCategoryEmoji(category!)} {category} Coloring Pages</Title>
        </Header>

        {/* Filters - One Line Layout */}
        <FiltersContainer>
          <FiltersRow>
            {/* Search Input */}
            <FilterGroup>
              <FilterLabel htmlFor="search">🔍</FilterLabel>
              <SearchInput
                id="search"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </FilterGroup>

            <Divider />

            {/* Sort Dropdown */}
            <FilterGroup>
              <FilterLabel htmlFor="sort">Sort:</FilterLabel>
              <Select 
                id="sort" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="easy-first">Easy First</option>
                <option value="hard-first">Hard First</option>
                <option value="alphabetical">A-Z</option>
              </Select>
            </FilterGroup>

            <Divider />

            {/* Difficulty Checkboxes */}
            <FilterGroup>
              <MobileLabel>Difficulty</MobileLabel>
              <FilterLabel>Difficulty:</FilterLabel>
              <FilterCheckboxGroup>
                <CheckboxLabel $isActive={difficultyFilter.includes(1)}>
                  <input 
                    type="checkbox" 
                    checked={difficultyFilter.includes(1)}
                    onChange={() => toggleDifficultyFilter(1)}
                  />
                  Easy
                </CheckboxLabel>
                <CheckboxLabel $isActive={difficultyFilter.includes(2)}>
                  <input 
                    type="checkbox" 
                    checked={difficultyFilter.includes(2)}
                    onChange={() => toggleDifficultyFilter(2)}
                  />
                  Medium
                </CheckboxLabel>
                <CheckboxLabel $isActive={difficultyFilter.includes(3)}>
                  <input 
                    type="checkbox" 
                    checked={difficultyFilter.includes(3)}
                    onChange={() => toggleDifficultyFilter(3)}
                  />
                  Hard
                </CheckboxLabel>
              </FilterCheckboxGroup>
            </FilterGroup>

            {/* Clear Button & Active Count */}
            <FilterActions>
              {hasActiveFilters && (
                <ActiveFilters>
                  <FilterBadge>{activeFilterCount}</FilterBadge>
                  active filter{activeFilterCount !== 1 ? 's' : ''}
                </ActiveFilters>
              )}
              <ClearButton 
                onClick={clearAllFilters}
                disabled={!hasActiveFilters}
              >
                Clear All
              </ClearButton>
            </FilterActions>
          </FiltersRow>
        </FiltersContainer>

        {/* Results Info */}
        {data && data.content.length > 0 && (
          <ResultsInfo>
            <ResultCount>
              Showing <span>{filteredAndSortedPaintings.length}</span> of {data.content.length} coloring pages
            </ResultCount>
            {hasActiveFilters && (
              <ActiveFilters>
                {searchQuery && <FilterBadge>Search: "{searchQuery}"</FilterBadge>}
                {difficultyFilter.includes(1) && <FilterBadge>Easy</FilterBadge>}
                {difficultyFilter.includes(2) && <FilterBadge>Medium</FilterBadge>}
                {difficultyFilter.includes(3) && <FilterBadge>Hard</FilterBadge>}
              </ActiveFilters>
            )}
          </ResultsInfo>
        )}

        {/* Results Grid or Empty State */}
        {filteredAndSortedPaintings.length > 0 ? (
          <Grid>
            {filteredAndSortedPaintings.map((painting) => (
              <PaintingCard key={painting.id} painting={painting} />
            ))}
          </Grid>
        ) : data && data.content.length > 0 ? (
          <EmptyState>
            <EmptyTitle>🔍 No matches found</EmptyTitle>
            <EmptyText>
              {searchQuery 
                ? `No coloring pages match "${searchQuery}" with your current filters.`
                : 'No coloring pages match your current filters.'
              }
            </EmptyText>
            <ClearButton onClick={clearAllFilters}>
              Clear All Filters & Show All
            </ClearButton>
          </EmptyState>
        ) : (
          <EmptyState>
            <EmptyTitle>🎨 Coming Soon!</EmptyTitle>
            <EmptyText>
              We're working on adding more {category} coloring pages.
              Check back soon!
            </EmptyText>
          </EmptyState>
        )}
        
        {content && (
          <Description>
            <h2>Why Choose Our {category} Coloring Pages?</h2>
            <p>{content.description}</p>
            
            <h2>Educational Benefits</h2>
            <ul>
              {content.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            
            <p><strong>Age Range:</strong> {content.ageRange}</p>
            <p><strong>Learning Value:</strong> {content.learningValue}</p>
          </Description>
        )}
      </Container>
    </>
  )
}

export default CategoryPage
