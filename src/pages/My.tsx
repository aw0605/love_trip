import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@remote/firebase'
import Button from '@shared/Button'

function MyPage() {
  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <div>
      <Button onClick={handleLogout}>로그아웃</Button>
    </div>
  )
}

export default MyPage
