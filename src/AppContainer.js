import styled from 'styled-components'

const AppContainer = styled.div`
  margin: auto;
  max-width: 1200px;
  height: 100%;
  color: white;
`

const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  background: #590c57;
  cursor: pointer;
  color: white;
  border: none;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
`

const TitleContainer = styled.div`
  background: #a12d9d;
  color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 5rem;
  }

  & h2 {
    margin: 0;
    font-size: 1.rem;
  }
`

const PopupBackground = styled.div`
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #750f72;
  z-index: 1000;
`
const PopupContainer = styled.div`
  box-shadow: 2px 2px 50px 18px rgb(0 0 0 / 75%);
  text-align: center;
  position: fixed;
  z-index: 1050;
  width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2.5px;
  background: white;
  padding: 20px;
  outline: 0;
`

const SimpleButton = styled.button`
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`

const ImageButton = styled.button`
  padding: 0;
  border: 0;
  max-width: 100%;
  max-height: 200px;

  & img {
    max-width: 100%;
    max-height: 200px;
    width: auto;
  }
`

export {
  AppContainer,
  SubmitButton,
  PopupContainer,
  PopupBackground,
  SimpleButton,
  TitleContainer,
  ImageButton,
}