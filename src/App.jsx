import './App.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { ProvidePopup } from './components/usePopup'
import React from 'react'
import Landing from './components/Landing'
import Popup from './components/Popup'
import Dataset from './components/Dataset'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => (
  <ProvidePopup>
    <Router>
      <Popup />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='dataset' element={<Dataset />} />
      </Routes>
    </Router>
  </ProvidePopup>
)

export default App
