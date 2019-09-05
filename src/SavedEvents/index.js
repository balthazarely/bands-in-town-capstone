import React from 'react';
import { Button, List } from 'semantic-ui-react'



const SavedEvents = (props) => {

    // console.log(props.savedEvents[0].id)
    console.log(props.savedEvents[0])
    const eventlist = props.savedEvents.map((event, i) => {
        return(
            <div key={i}>
                <h4>{event.lineup[0]}</h4>
                <p>{event.datetime}</p>
                <p>{event.venue.city}, {event.venue.country}</p>
                <Button.Group basic size='small'>
                    <Button onClick={props.removeShowFromList.bind(null, event)}icon='delete'/>
                </Button.Group>
                <form action={event.offers[0].url} target="blank" method="get">
                    <button>Tickets</button>
                </form>
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
