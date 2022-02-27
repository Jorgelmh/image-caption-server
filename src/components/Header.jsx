import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AppContainer } from '../AppContainer'

const HeaderContainer = styled.header`
  background: #590c57;
  padding: 20px;
  color: white;
`

/**
 *  ==============================
 *          COMMON HEADER
 *  ==============================
 *  
 * Allows to go back to the landing page
 */

const Header = () => (
  <HeaderContainer>
    <AppContainer>
      <Link className='link-button' style={{ boxShadow: 'none' }} to='/'> <Icon icon='bxs:home' /> KnoCal </Link>
    </AppContainer>
  </HeaderContainer>
)

export default Header
