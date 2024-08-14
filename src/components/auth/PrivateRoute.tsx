import { useNavigate } from 'react-router-dom'
import useUser from '@hooks/auth/useUser'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useUser()
  const navigate = useNavigate()

  if (user == null) {
    navigate('/signin')
  }
  return <>{children}</>
}

export default PrivateRoute
