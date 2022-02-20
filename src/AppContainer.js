import styled from 'styled-components'

const AppContainer = styled.div`
  margin: auto;
  max-width: 1200px;
  height: 100%;
`

const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  background: #1aadb0;
  cursor: pointer;
  color: white;
  border: none;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
`
const PopupBackground = styled.div`
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(69, 69, 68, .5);
  z-index: 1000;
`
const PopupContainer = styled.div`
  box-shadow: 2px 3px 35px -14px rgba(0,0,0,0.75);
  text-align: center;
  position: fixed;
  z-index: 1050;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2.5px;
  background: white;
  padding: 20px;
  outline: 0;
`

export {
  AppContainer,
  SubmitButton,
  PopupContainer,
  PopupBackground,
}