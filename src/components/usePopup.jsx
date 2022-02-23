import React, { createContext, useState, useContext } from 'react'
/**
 *  ===============================
 *      SAFETY CHECK CONTEXT
 *  ===============================
 */
const PopupContext = createContext()

export const ProvidePopup = ({ children }) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true)
  const [prediction, setPrediction] = useState(null)

  /* Show/Hide popup handlers */
  const displayPopup = (predictionDb) => {
    setPrediction(predictionDb)
    setLoading(false)
    setShow(true)
  }
  const hidePopup = () => {
    setPrediction(null)
    setShow(false)
  }

  const displayRandom = () => {
    setLoading(true)
    setShow(true)
  }

  return (
    <PopupContext.Provider value={{ displayRandom, displayPopup, prediction, loading, hidePopup, show, setLoading }}>
      {
        children
      }
    </PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)