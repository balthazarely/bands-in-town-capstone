import React from 'react'
import { Header, Icon } from 'semantic-ui-react'


const LogoHeader = () => (
  <Header className="header" as='h2'>
    <Icon className=".main-icon" name='music' />
    <div className="header-text">
      <Header.Content></Header.Content>
      
    </div>
  </Header>
)

export default LogoHeader;


