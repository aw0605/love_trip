import { useRef } from 'react'
import { css } from '@emotion/react'
import useLoadKakaoMap from '@hooks/useLoadKakaoMap'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

import { Hotel } from '@models/hotel'

declare global {
  interface Window {
    kakao: any
  }
}

function Map({ location }: { location: Hotel['location'] }) {
  const {
    directions,
    pointGeolocation: { x, y },
  } = location

  const mapContainer = useRef(null)

  useLoadKakaoMap({ lat: y, lng: x, containerRef: mapContainer })

  return (
    <Flex direction="column" style={{ padding: '24px' }}>
      <Text typography="t4" bold={true}>
        기본 정보
      </Text>
      <div ref={mapContainer} css={mapContainerStyels} />
      <Text typography="t6">{directions}</Text>
    </Flex>
  )
}

const mapContainerStyels = css`
  width: 100%;
  height: 250px;
  margin: 16px 0;
  boxsizing: border-box;
`

export default Map
