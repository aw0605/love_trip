import { useEffect, useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import Tag from '@shared/Tag'
import addDelimiter from '@utils/addDelimiter'
import formatTime from '@utils/formatTime'

import { Hotel } from '@models/hotel'

function HotelItem({
  hotel,
  onLike,
  isLike,
}: {
  hotel: Hotel
  onLike: ({
    hotel,
  }: {
    hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>
  }) => void
  isLike: boolean
}) {
  const [remainTime, setRemainTime] = useState(0)

  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) {
      return
    }

    const promoEndTime = hotel.events.promoEndTime

    const timer = setInterval(() => {
      const remainSec = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )

      if (remainSec < 0) {
        clearInterval(timer)
        return
      }

      setRemainTime(remainSec)
    }, 1_000)

    return () => {
      clearInterval(timer)
    }
  }, [hotel.events])

  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    onLike({
      hotel: {
        name: hotel.name,
        mainImageUrl: hotel.mainImageUrl,
        id: hotel.id,
      },
    })
  }

  const tagComponent = () => {
    if (hotel.events == null) {
      return null
    }
    const { name, tagThemeStyle } = hotel.events
    const promotionTxt =
      remainTime > 0 ? ` - ${formatTime(remainTime)} 남음` : ''

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionTxt)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }

  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          contents={
            <Flex direction="column">
              {tagComponent()}
              <ListRow.Texts title={hotel.name} subTitle={hotel.comment} />
              <Spacing size={5} />
              <Text typography="t7" color="gray600">
                {hotel.starRating}성급
              </Text>
            </Flex>
          }
          right={
            <Flex
              direction="column"
              align="flex-end"
              style={{ position: 'relative' }}
            >
              <img
                src={hotel.mainImageUrl}
                alt={hotel.name}
                css={imageStyels}
              />
              <img
                src={
                  isLike
                    ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
                    : 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-64.png'
                }
                alt="찜하기"
                css={iconHeartStyles}
                onClick={handleLike}
              />
              <Text bold={true}>{addDelimiter(hotel.price)}원</Text>
            </Flex>
          }
          style={containerStyles}
        />
      </Link>
    </div>
  )
}

const containerStyles = css`
  align-items: flex-start;
`

const imageStyels = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin: 0 0 5px 15px;
`

const iconHeartStyles = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
`

export default HotelItem
