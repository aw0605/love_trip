import useGoogleSignin from '@hooks/useGoogleSignin'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'
import Flex from '@shared/Flex'

function SignInPage() {
  const { signin } = useGoogleSignin()

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ height: '100vh' }}
    >
      <img
        src="https://cdn2.iconfinder.com/data/icons/line-drawn-social-media/30/send-64.png"
        alt="로그인 이미지"
        width={120}
        height={120}
      />
      <Spacing size={30} />
      <Button size="medium" onClick={signin}>
        <Flex align="center" justify="center">
          <img
            src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-64.png"
            alt="구글"
            width={20}
            height={20}
          />
          <Spacing direction="horizontal" size={5} />
          Google 로그인
        </Flex>
      </Button>
    </Flex>
  )
}

export default SignInPage
