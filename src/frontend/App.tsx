import { Routes, Route } from 'react-router-dom'
import Home from './features/home/page'
import Builder from './features/builder/page'
import Preview from './features/preview/page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  )
}

export default App
