import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import Button from './Button'
import Flex from './Flex'

import { colors } from '@styles/colorPalette'
import useUser from '@hooks/auth/useUser'

function Navbar() {
  const location = useLocation()
  const showSignBtn =
    ['/signup', '/signin'].includes(location.pathname) === false

  const user = useUser()

  const renderBtn = useCallback(() => {
    if (user != null) {
      return (
        <Flex align="center">
          <Link to="/my">
            <img
              src={
                user.photoURL ??
                'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png'
              }
              alt={`${user.displayName}의 이미지`}
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
          </Link>
        </Flex>
      )
    }
    if (showSignBtn) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignBtn])

  return (
    <Flex justify="space-between" align="center" css={NavbarContainerStyles}>
      <Link to="/">Love Trip</Link>
      {renderBtn()}
    </Flex>
  )
}

const NavbarContainerStyles = css`
  position: sticky;
  top: 0;
  padding: 10px 24px;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`

export default Navbar
