import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HotelListPage from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import TestPage from '@pages/Test'
import useLoadKakao from '@hooks/useLoadKakao'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HotelListPage} />
        <Route path="/hotel/:id" Component={HotelPage} />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
