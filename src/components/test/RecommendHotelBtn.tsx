import { collection, writeBatch, getDocs } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import Button from '@shared/Button'

function RecommendHotelBtn() {
  const handleBtnClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))

    snapshot.docs.forEach((hotel) => {
      const recommendArr = []

      for (let doc of snapshot.docs) {
        if (recommendArr.length === 5) {
          break
        }

        if (doc.id !== hotel.id) {
          recommendArr.push(doc.id)
        }
      }

      batch.update(hotel.ref, {
        recommendHotels: recommendArr,
      })
    })

    await batch.commit()

    alert('업데이트가 완료되었습니다.')
  }

  return <Button onClick={handleBtnClick}>추천 호텔 추가</Button>
}

export default RecommendHotelBtn
