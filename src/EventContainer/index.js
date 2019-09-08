import React from 'react';
import { Divider, Button, Card, Icon } from 'semantic-ui-react'
import { tsImportEqualsDeclaration } from '@babel/types';



const EventContainer = (props) => {
    // console.log(props.concert, " < concert info in ConcertContainer") 
    console.log(props.event[0].resultsPage.results.event, " < props in eventContainer")
        const events = props.event[0].resultsPage.results.event.map((event, i) => {
        
        
            return (
            <Card key={i}>
            <Card.Content>
                <Card.Description><h5 className="event-header">{event.displayName}</h5></Card.Description>
                    <Card.Description>{event.venue.displayName}</Card.Description>
                    <Card.Description>{event.venue.metroArea.displayName}</Card.Description>
                    <Card.Meta>{event.start.date}</Card.Meta>
                <Button size="mini">tickets</Button>
            </Card.Content>
          </Card>
        )   
    })

    return(
        <div>
            <Divider className="white" inverted horizontal><h3> Events Nearby </h3></Divider>
            <Card.Group >
                {events}
            </Card.Group>
        </div>
    )
}

export default EventContainer;


