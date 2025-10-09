import styled from 'styled-components'

interface AdSpaceProps {
  slot?: 'top' | 'bottom' | 'sidebar'
  height?: number
}

const AdContainer = styled.div<{ $height: number }>`
  width: 100%;
  min-height: ${props => props.$height}px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  
  @media (max-width: 768px) {
    min-height: ${props => Math.min(props.$height, 50)}px;
  }

  /* Hide placeholder in production when ads are enabled */
  &.ad-enabled {
    background: transparent;
    border: none;
  }
`

/**
 * AdSpace Component - Placeholder for Google AdSense
 * 
 * To enable Google Ads:
 * 1. Add Google AdSense script to index.html
 * 2. Replace placeholder content with <ins> tag for AdSense
 * 3. Set VITE_ADS_ENABLED=true in environment
 * 
 * Example AdSense integration:
 * <ins className="adsbygoogle"
 *      style={{ display: 'block' }}
 *      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *      data-ad-slot="XXXXXXXXXX"
 *      data-ad-format="auto"
 *      data-full-width-responsive="true">
 * </ins>
 */
function AdSpace({ slot = 'top', height = 50 }: AdSpaceProps) {
  const adsEnabled = import.meta.env.VITE_ADS_ENABLED === 'true'

  // Don't show placeholder if ads are enabled
  if (adsEnabled) {
    return (
      <AdContainer $height={height} className="ad-enabled">
        {/* Google AdSense code will go here */}
        {/* Example:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true">
        </ins>
        */}
      </AdContainer>
    )
  }

  // Show placeholder in development
  return (
    <AdContainer $height={height}>
      {/* Ad space reserved ({slot}) */}
    </AdContainer>
  )
}

export default AdSpace

