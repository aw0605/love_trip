import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getHotels } from '@remote/hotel'

function useHotels() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['hotels'], ({ pageParam }) => getHotels(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
    suspense: true,
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  const hotels = data?.pages.map(({ items }) => items).flat()

  return { data: hotels, hasNextPage, isFetching, loadMore }
}

export default useHotels
