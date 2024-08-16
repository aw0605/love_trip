import { collection, getDocs, writeBatch } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import Button from '@shared/Button'

import { FORMS } from '@/mock/data'

function HotelFormAddBtn() {
  const handleBtnClick = async () => {
    const batch = writeBatch(store)
    const snapshots = await getDocs(collection(store, COLLECTIONS.HOTEL))

    snapshots.docs.forEach((hotel) => {
      batch.update(hotel.ref, {
        forms: FORMS,
      })
    })
    await batch.commit()

    alert('폼 데이터 추가 완료')
  }

  return <Button onClick={handleBtnClick}>폼 데이터 추가</Button>
}

export default HotelFormAddBtn
