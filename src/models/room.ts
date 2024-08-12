export interface Room {
  price: number
  roomName: string
  avaliableCount: number
  basicInfo: {
    [key: string]: string | number
  }
  refundable: boolean
  imageUrl: string
}
