import React from 'react'
import { Header, Icon } from 'semantic-ui-react'


const LogoHeader = () => (
  <Header className="header" as='h2'>
   
    <div className="header-text">
        <div>
          <img className="logoPlacer" src="Logo.png"/>
      </div>      
    </div>
  </Header>
)

export default LogoHeader;


