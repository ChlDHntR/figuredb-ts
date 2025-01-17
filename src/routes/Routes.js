import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function RouteMap({ children }) {
  return (
    <Router>
      <Routes>
        <Route>{children}</Route>
      </Routes>
    </Router>
  )
}

export default RouteMap
