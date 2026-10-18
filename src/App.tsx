import { Route, Routes } from 'react-router'
import BuilderPage from './pages/BuilderPage.tsx'
import PreviewPage from './pages/PreviewPage.tsx'
import TestListPage from './pages/TestListPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TestListPage />} />
      <Route path="/tests/new" element={<BuilderPage />} />
      <Route path="/tests/:id/preview" element={<PreviewPage />} />
    </Routes>
  )
}
