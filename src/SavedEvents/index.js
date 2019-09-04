import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'


const SavedEvents = (props) => {

    // console.log(props.savedEvents[0].id)
    // console.log(props.savedEvents[0])
    // const eventlist = props.savedEvents[0].map((event, i) => {
    const eventlist = props.savedEvents.map((event, i) => {
        return(
            <div key={i}>
                <h4>{event.lineup[0]} {event.datetime} {event.venue.city}</h4>
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
             <p>Saved Events:</p>
             {eventlist}
        </div>
    )
}



export default SavedEvents;
