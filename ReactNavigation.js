// npm install react-router-dom

import React from 'react'
import {BrowserRouter as Router,Route,Switch,Link,Routes, BrowserRouter} from 'react-router-dom'
import Home from './screens/Home'
import VideoUpload from './screens/VideoUpload'

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/VideoUpload">VideoUpload</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VideoUpload" element={<VideoUpload />} />
      </Routes>
   
    </Router>
  )
}

export default App
