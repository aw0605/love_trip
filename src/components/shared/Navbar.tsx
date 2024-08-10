import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import Button from './Button'
import Flex from './Flex'

import { colors } from '@styles/colorPalette'

function Navbar() {
  const location = useLocation()
  const showSignBtn =
    ['/signup', '/signin'].includes(location.pathname) === false

  // todo
  const user = null

  const renderBtn = useCallback(() => {
    if (user != null) {
      return (
        <Link to="/my">
          {/* todo */}
          <img src="" alt="임시 이미지" />
        </Link>
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
      <Link to="/">홈</Link>
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
