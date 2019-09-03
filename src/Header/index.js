import React from 'react'
import { Header, Icon } from 'semantic-ui-react'


const LogoHeader = () => (
  <Header className="header" as='h2'>
    <Icon name='music' />
    <Header.Content>ConcertCrawler</Header.Content>
  </Header>
)

export default LogoHeader;


