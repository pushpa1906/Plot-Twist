import { Route, Routes } from 'react-router'
import TestListPage from './pages/TestListPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TestListPage />} />
    </Routes>
  )
}
