import React from 'react'
import { AppContainer, SubmitButton } from '../AppContainer'
import { usePopup } from './usePopup'
import axios from 'axios'

/**
 *  =============================
 *          LANDING PAGE
 *  =============================
 * 
 *  Generator random image caption and image from backend
 */

const Landing = () => {
  const { displayRandom, displayPopup } = usePopup()

  const handleClick = () => {
    displayRandom()

    axios.get('/api/randomcaption').then((response) => {
      displayPopup(response.data[0])
    })
  }
  return (
    <AppContainer>
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
        <SubmitButton onClick={handleClick}> Generate Random Caption </SubmitButton>
      </div>
    </AppContainer>
  )
}

export default Landing
