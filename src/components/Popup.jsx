import React, { useState } from 'react'
import { PopupContainer, SubmitButton, SimpleButton } from '../AppContainer'
import { usePopup } from './usePopup'
import loader from '../loader.gif'
import axios from 'axios'
import { Icon } from '@iconify/react'

/**
 *  ===============================
 *    POPUP THAT DISPLAYS EXAMPLE
 *  ===============================
 */

const Popup = () => {
  /* Get data from hook */
  const { prediction, loading, show, hidePopup } = usePopup()
  const [submitted, setSubmitted] = useState(false)
  const [rate, setRate] = useState(0)

  const handleTryAgain = () => {
    if (rate === 0) {
      alert('You have to select a rate for this caption')
    }
    axios.post('/api/prediction', { caption_id: prediction.id, rate })
    setSubmitted(true)
  }

  const closePopup = () => {
    setSubmitted(false)
    hidePopup()
    setRate(0)
  }

  return show ? (
    <PopupContainer>
      {
        submitted ? (
          <>
            <Icon style={{ fontSize: '60px', textAlign: 'center', marginBottom: '10px', color: '#590c57' }} icon='bi:check-circle-fill' />
            <h4 style={{ color: '#590c57', fontSize: '1rem', textAlign: 'center', marginBottom: '50px' }}> Thanks for your feedback! </h4>
            <SubmitButton onClick={closePopup}>Close</SubmitButton>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {
              !loading && (
                <h1 style={{ marginTop: '0', fontSize: '2rem' }}>Prediction Generated! 🎉</h1>
              )
            }
              <div>
                <SubmitButton style={{ display: 'flex', background: '#cc301f', borderRadius: '50%' }} onClick={closePopup}>
                  <Icon icon='ant-design:close-outlined' />
                </SubmitButton>
              </div>
            </div>
            {
              (loading) ? (
                <div>
                  <img style={{ maxWidth: '250px' }} src={loader} />
                    <p>Calculating Prediction ...</p>
                </div>
              ) : (
                <>
                  <img src={prediction.image_url} className='submitted-img' alt='Your submitted image' />
                  <h2 style={{ margin: '5px', fontSize: '1.2rem' }}>Model Prediction:</h2>
                  <p style={{ marginTop: '0' }}>{ prediction.caption }</p>
                  <div className="disp-flex" style={{ justifyContent: 'center', margin: '20px 0' }}>
                    {
                      [...Array(5)].map((val, index) => (
                        <React.Fragment key={index}>
                          {
                            (index < rate) ? (
                              <SimpleButton onClick={() => setRate(index + 1)}> <Icon style={{ color: '#750f72' }} icon='ant-design:star-filled' /> </SimpleButton>
                            ) : (
                              <SimpleButton onClick={() => setRate(index + 1)}> <Icon style={{ color: '#750f72' }} icon='ant-design:star-outlined' /> </SimpleButton>
                            )
                          }
                        </React.Fragment>
                      ))
                    }
                  </div>
                  <SubmitButton onClick={handleTryAgain}> Submit </SubmitButton>
                </>
              )
            }
                </>
              )
            }
    </PopupContainer>
  ) : null
}

export default Popup
