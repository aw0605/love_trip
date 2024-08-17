import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'
import useHotel from '@components/hotel/hooks/useHotel'
import Top from '@shared/Top'
import Carousel from '@components/hotel/Carousel'
import Rooms from '@components/hotel/Rooms'
import Contents from '@components/hotel/Contents'
import Map from '@components/hotel/Map'
import RecommendHotels from '@components/hotel/RecommendHotels'
import ActionBtns from '@components/hotel/ActionBtns'
import Review from '@components/hotel/Review'
import ScrollProgressBar from '@components/shared/ScrollProgressBar'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { data: hotel, isLoading } = useHotel({ id })

  if (hotel == null || isLoading) {
    return <div>로딩중</div>
  }

  const { name, comment, images, contents, location, recommendHotels } = hotel

  return (
    <div>
      <ScrollProgressBar style={scrollProgressBarStyles} />
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
      <ActionBtns hotel={hotel} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
      <RecommendHotels recommendHotels={recommendHotels} />
      <Review hotelId={id} />
    </div>
  )
}

const scrollProgressBarStyles = css`
  position: sticky;
  top: 62px;
  z-index: 2;
`

export default HotelPage
