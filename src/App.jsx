import './App.css'
import { AppContainer, PopupContainer, SubmitButton } from './AppContainer'
import React, { useState } from 'react'
import loader from './loader.gif'
import axios from 'axios'

const App = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [captionPrediction, setCaptionPrediction] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const handleClick = () => {
    setLoading(true)
    setShowPopup(true)

    axios.post('/api/prediction', { image_url: imageUrl }).then(({ data }) => {
      setCaptionPrediction(data.caption)
      setLoading(false)
    })
  }

  const handleTryAgain = () => {
    setImageUrl('')
    setCaptionPrediction('')
    setShowPopup(false)
  }
  
  return (
    <>
      {
        showPopup && (
          <>
            <PopupContainer>
              {
                (loading) ? (
                  <div>
                    <img style={{ maxWidth: '250px' }} src={loader} />
                    <p>Calculating Prediction ...</p>
                  </div>
                ) : (
                  <>
                    <h1>Model Prediction! 🎉</h1>
                    <img src={imageUrl} className='submitted-img' alt='Your submitted image' />
                    <p>{ captionPrediction }</p>
                    <SubmitButton onClick={handleTryAgain}> Try Again </SubmitButton>
                  </>
                )
              }
            </PopupContainer>
          </>
        )
      }
      <AppContainer>
        <div style={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
          <input className='styled-input' type='text' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <SubmitButton onClick={handleClick}> Submit </SubmitButton>
          </div>
      </AppContainer>
    </>
  )
}

export default App
