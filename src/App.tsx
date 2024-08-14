import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthGuard from '@components/auth/AuthGuard'
import PrivateRoute from '@components/auth/PrivateRoute'
import useLoadKakao from '@hooks/useLoadKakao'
import Navbar from '@shared/Navbar'
import HotelListPage from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import TestPage from '@pages/Test'
import SignInPage from '@pages/SignIn'
import MyPage from '@pages/My'
import SettingsPage from '@pages/settings'
import LikePage from '@pages/settings/like'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/" element={<HotelListPage />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route
            path="/my"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/like"
            element={
              <PrivateRoute>
                <LikePage />
              </PrivateRoute>
            }
          />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
