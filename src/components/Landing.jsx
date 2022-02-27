import React from 'react'
import { AppContainer, SubmitButton, TitleContainer } from '../AppContainer'
import { usePopup } from './usePopup'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'

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
    <>
      <Header />
      <AppContainer>
        <div style={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
          <div>
            <TitleContainer>
              <h1> Try KnoCal! </h1>
              <h2> Knowledge-based Captioning Algorithm </h2>
              <p> A novel ML model that generates captions based on external sources of knowledge. </p>
            </TitleContainer>
            <div className="disp-flex" style={{ margin: '20px 0', justifyContent: 'center', alignItems: 'center' }}>
              <SubmitButton style={{ fontSize: '1.2rem' }} onClick={handleClick}> Generate Random Caption </SubmitButton>
              <Link className='link-button' to='/dataset'> See dataset </Link>
            </div>
          </div>
        </div>
      </AppContainer>
    </>
  )
}

export default Landing
