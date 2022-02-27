import React from 'react'
import { ImageButton } from '../AppContainer'

const PredictionCard = (props) => (
  <div className='disp-flex' style={{ justifyContent: 'center' }}>
    <ImageButton onClick={props.handleClick}>
      <img src={props.image_url} />
    </ImageButton>
  </div>
)

export default PredictionCard
