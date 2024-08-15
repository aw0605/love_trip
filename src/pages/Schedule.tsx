import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import RangePicker from '@shared/RangePicker'
import FixedBottomBtn from '@shared/FixedBottomBtn'

function SchedulePage() {
  const { roomId = '', hotelId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    roomId: string
    hotelId: string
  }

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights?: number
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (roomId === '' || hotelId === '') {
      window.history.back()
    }
  }, [roomId, hotelId])

  const moveToReservationPage = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      { addQueryPrefix: true },
    )

    navigate(`/reservation${params}`)
  }

  const isSelected =
    selectedDate.startDate != null && selectedDate.endDate != null

  const buttonLabel = isSelected
    ? `${selectedDate.startDate} - ${selectedDate.endDate} (${selectedDate.nights}박)`
    : '예약 날짜를 선택해주세요'

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          })
        }}
      />
      <FixedBottomBtn
        label={buttonLabel}
        onClick={moveToReservationPage}
        disabled={!isSelected}
      />
    </div>
  )
}

export default SchedulePage
