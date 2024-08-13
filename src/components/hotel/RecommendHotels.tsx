import { useState } from 'react'
import { css } from '@emotion/react'
import useRecommendHotels from './hooks/useRecommendHotels'
import addDelimiter from '@utils/addDelimiter'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import Button from '@shared/Button'

function RecommendHotels({ recommendHotels }: { recommendHotels: string[] }) {
  const [showMore, setShowMore] = useState(false)
  const { data: rHotels, isLoading } = useRecommendHotels({
    hotelIds: recommendHotels,
  })

  if (rHotels == null || isLoading) {
    return null
  }

  const hotelList =
    rHotels.length < 3 || showMore ? rHotels : rHotels.slice(0, 3)

  return (
    <div style={{ margin: '24px 0' }}>
      <Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
        추천 호텔
      </Text>
      <Spacing size={16} />

      <ul>
        {hotelList.map((hotel) => (
          <ListRow
            left={
              <img
                src={hotel.mainImageUrl}
                alt={hotel.name}
                css={imageStyles}
              />
            }
            contents={
              <ListRow.Texts
                title={hotel.name}
                subTitle={`${addDelimiter(hotel.price)}원`}
              />
            }
            key={hotel.id}
          />
        ))}
      </ul>

      {rHotels.length > 3 && !showMore ? (
        <div style={{ padding: '0 24px', marginTop: 16 }}>
          <Button
            full={true}
            weak={true}
            onClick={() => {
              setShowMore(true)
            }}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default RecommendHotels
