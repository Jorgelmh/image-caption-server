import React from 'react'
import { PopupContainer, SubmitButton } from '../AppContainer'
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
  const { prediction, loading, show, displayPopup, hidePopup } = usePopup()

  const handleTryAgain = () => {
    axios.get('/api/randomcaption').then((response) => {
      displayPopup(response.data[0])
    })
  }

  return show ? (
    <PopupContainer>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <SubmitButton onClick={hidePopup}>
          <Icon style={{ color: '#cc301f' }} icon='ant-design:close-circle-filled' />
        </SubmitButton>
      </div>
      {
        (loading) ? (
          <div>
            <img style={{ maxWidth: '250px' }} src={loader} />
              <p>Calculating Prediction ...</p>
          </div>
        ) : (
          <>
            <h1>Model Prediction! 🎉</h1>
            <img src={prediction.image_url} className='submitted-img' alt='Your submitted image' />
            <p>{ prediction.caption }</p>
            <SubmitButton onClick={handleTryAgain}> Try Again </SubmitButton>
          </>
        )
      }
    </PopupContainer>
  ) : null
}

export default Popup
