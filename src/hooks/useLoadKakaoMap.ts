import { useEffect } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

interface UseLoadKakaoMapProps {
  lat: number
  lng: number
  containerRef: React.RefObject<HTMLDivElement>
}

const useLoadKakaoMap = ({ lat, lng, containerRef }: UseLoadKakaoMapProps) => {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script')
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`
      script.async = true

      document.head.appendChild(script)

      script.onload = () => {
        window.kakao.maps.load(() => {
          const position = new window.kakao.maps.LatLng(lat, lng)

          const options = {
            center: position,
            level: 5,
          }

          const map = new window.kakao.maps.Map(containerRef.current, options)
          new window.kakao.maps.Marker({
            position,
            map,
          })
        })
      }
    }

    loadScript()
  }, [lat, lng, containerRef])
}

export default useLoadKakaoMap
