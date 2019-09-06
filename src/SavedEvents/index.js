import React from 'react';
import { Button, Popup, Divider } from 'semantic-ui-react'



const SavedEvents = (props) => {



    // console.log(props.savedEvents[0].id)
    console.log(props.savedEvents[0])
    const eventlist = props.savedEvents.map((event, i) => {
        return(
            <div key={i}>
                <h4>{event.lineup[0]}</h4>
                <p>{event.venue.name}</p>
                <p>{event.datetime}</p>
                <p>{event.venue.city}, {event.venue.country}</p>
               
                <Button.Group  size='tiny'>
                    <Button onClick={props.removeShowFromList.bind(null, event)}icon='delete' />>
                    <Button>Tickets</Button>
                    
             
                </Button.Group>
                
                <Divider />
            </div> 
        )
    })

    





    return(
        <div>
             <h3>Saved Events:</h3>
             {eventlist}
        </div>
    )
}


export default SavedEvents;
