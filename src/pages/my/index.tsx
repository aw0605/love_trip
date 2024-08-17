import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '@remote/firebase'
import useUser from '@hooks/auth/useUser'
import ListRow from '@shared/ListRow'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'

function MyPage() {
  const user = useUser()
  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <div>
      <Flex direction="column">
        <Text
          bold={true}
          typography="t4"
          style={{ margin: 24, marginBottom: 4 }}
        >
          내 정보
        </Text>
        <ListRow
          left={
            <img
              src={
                user?.photoURL ??
                'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png'
              }
              alt={`${user?.displayName}의 이미지`}
              width={100}
              height={100}
              style={{ borderRadius: 5 }}
            />
          }
          contents={
            <Flex direction="column">
              <ListRow.Texts title={user?.displayName} subTitle={user?.email} />
              <Spacing size={14} />
              <Button onClick={handleLogout}>로그아웃</Button>
            </Flex>
          }
        />
      </Flex>

      <Spacing size={30} />
      <div>
        <ul>
          <li>
            <Link to="/my/like">
              <ListRow
                as="div"
                contents={
                  <ListRow.Texts
                    title="찜하기"
                    subTitle="찜한 호텔 순서 변경"
                  />
                }
                withArrow={true}
              />
            </Link>
            <li>
              <Link to="/reservation/list">
                <ListRow
                  as="div"
                  contents={
                    <ListRow.Texts
                      title="예약 현황"
                      subTitle="예약 현황 보러가기"
                    />
                  }
                  withArrow={true}
                />
              </Link>
            </li>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MyPage
