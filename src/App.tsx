import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AuthGuard from '@components/auth/AuthGuard'
import PrivateRoute from '@components/auth/PrivateRoute'
import useLoadKakao from '@hooks/useLoadKakao'
import Navbar from '@shared/Navbar'

const HotelListPage = lazy(() => import('@pages/HotelList'))
const HotelPage = lazy(() => import('@pages/Hotel'))
const TestPage = lazy(() => import('@pages/Test'))
const SignInPage = lazy(() => import('@pages/SignIn'))
const MyPage = lazy(() => import('@pages/my/index'))
const LikePage = lazy(() => import('@pages/my/like'))
const SchedulePage = lazy(() => import('@pages/Schedule'))
const ReservationPage = lazy(() => import('@pages/Reservation'))
const ReservationDonePage = lazy(() => import('@pages/ReservationDone'))
const ReservationListPage = lazy(() => import('@pages/ReservationList'))

function App() {
  useLoadKakao()

  return (
    <Suspense fallback={<></>}>
      <HelmetProvider>
        <BrowserRouter>
          <AuthGuard>
            <Navbar />
            <Routes>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/" element={<HotelListPage />} />
              <Route path="/hotel/:id" element={<HotelPage />} />
              <Route
                path="/schedule"
                element={
                  <PrivateRoute>
                    <SchedulePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation"
                element={
                  <PrivateRoute>
                    <ReservationPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/done"
                element={
                  <PrivateRoute>
                    <ReservationDonePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/list"
                element={
                  <PrivateRoute>
                    <ReservationListPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my"
                element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my/like"
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
      </HelmetProvider>
    </Suspense>
  )
}

export default App
