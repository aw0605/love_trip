import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { store } from './firebase'

import { Reservation } from '@models/reservation'
import { Room } from '@models/room'

export async function makeReservation(newReservation: Reservation) {
  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId)
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
  )

  const room = roomSnapshot.data() as Room
  const curRemainRooms = room.avaliableCount

  if (curRemainRooms === 0) {
    throw new Error('no room')
  }

  return Promise.all([
    updateDoc(roomSnapshot.ref, {
      avaliableCount: curRemainRooms - 1,
    }),
    setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation),
  ])
}
