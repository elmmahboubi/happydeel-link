import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RedirectPage from './pages/RedirectPage'
import NotFoundPage from './pages/NotFoundPage'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<RedirectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App