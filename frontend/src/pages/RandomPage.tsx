import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { paintingsApi } from '../api/paintings'

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  flex-direction: column;
  gap: 1rem;
`

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

function RandomPage() {
  const navigate = useNavigate()
  
  const { data, error } = useQuery(
    'randomPainting',
    async () => {
      // Fetch all paintings and pick a random one
      const response = await paintingsApi.getAllPaintings(0, 100)
      const paintings = response.content
      if (paintings.length === 0) {
        throw new Error('No paintings available')
      }
      const randomIndex = Math.floor(Math.random() * paintings.length)
      return paintings[randomIndex]
    },
    {
      // Don't cache this query since we want a new random painting each time
      cacheTime: 0,
      staleTime: 0,
    }
  )

  useEffect(() => {
    if (data) {
      // Redirect to the random painting
      navigate(`/painting/${data.urlKey}`, { replace: true })
    }
  }, [data, navigate])

  if (error) {
    return (
      <Loading>
        <div>😢 Oops! Something went wrong.</div>
        <div style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'underline' }}>
            Go back to home
          </a>
        </div>
      </Loading>
    )
  }

  return (
    <Loading>
      <Spinner />
      <div>🎲 Finding a random coloring page for you... ✨</div>
    </Loading>
  )
}

export default RandomPage

