import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthGuard from '@components/auth/AuthGuard'
import useLoadKakao from '@hooks/useLoadKakao'
import Navbar from '@shared/Navbar'
import HotelListPage from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import TestPage from '@pages/Test'
import SignInPage from '@pages/SignIn'
import MyPage from '@pages/My'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/" element={<HotelListPage />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
