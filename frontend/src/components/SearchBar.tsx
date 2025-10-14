import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { paintingsApi } from '../api/paintings'

const SearchContainer = styled.div`
  position: relative;
  min-width: 250px;

  @media (max-width: 768px) {
    min-width: 200px;
  }
`

const SearchInput = styled.input`
  padding: 0.75rem 1.5rem;
  border: 3px solid #667eea;
  border-radius: 25px;
  font-size: 1rem;
  font-family: 'Fredoka', sans-serif;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;

  &:focus {
    border-color: #764ba2;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
`

const SuggestionsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const Suggestion = styled.div`
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  &:first-child {
    border-radius: 15px 15px 0 0;
  }

  &:last-child {
    border-radius: 0 0 15px 15px;
  }

  &:only-child {
    border-radius: 15px;
  }
`

const NoResults = styled.div`
  padding: 1rem 1.5rem;
  color: #999;
  text-align: center;
  font-style: italic;
`

function SearchBar() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      try {
        const results = await paintingsApi.autocompletePaintings(searchTerm, 8)
        setSuggestions(results)
        setShowSuggestions(true)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (term: string) => {
    if (term.trim()) {
      setShowSuggestions(false)
      setSearchTerm('')
      // Navigate to search results - we'll use the main search endpoint
      navigate(`/?search=${encodeURIComponent(term)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion)
  }

  return (
    <SearchContainer ref={searchRef}>
      <SearchInput
        type="text"
        placeholder={t('search.searchPaintings')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
      />
      {showSuggestions && (
        <SuggestionsDropdown>
          {isLoading ? (
            <NoResults>Searching...</NoResults>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <Suggestion key={index} onClick={() => handleSuggestionClick(suggestion)}>
                🎨 {suggestion}
              </Suggestion>
            ))
          ) : searchTerm.length >= 2 ? (
            <NoResults>No paintings found</NoResults>
          ) : null}
        </SuggestionsDropdown>
      )}
    </SearchContainer>
  )
}

export default SearchBar
