import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EmojiPage from './components/Pages/EmojiPage'
import CalendarPage from './components/Pages/CalendarPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/:hash" element={<EmojiPage/>} />
        <Route path="/" element={<CalendarPage/>} />
      </Routes>
    </Router>
  )
}

export default App
