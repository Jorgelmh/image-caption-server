import './App.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { ProvidePopup } from './components/usePopup'
import React from 'react'
import Landing from './components/Landing'
import Popup from './components/Popup'

const App = () => (
  <ProvidePopup>
    <Router basename='/static'>
      <Popup />
      <Routes>
        <Route exact path='/' element={<Landing />} />
      </Routes>
    </Router>
  </ProvidePopup>
)

export default App
