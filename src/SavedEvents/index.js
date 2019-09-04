import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'


const SavedEvents = (props) => {

    console.log(props.savedEvents[0].id)
    console.log(props.savedEvents[0])
    // const eventlist = props.savedEvents[0].map((event, i) => {
    const eventlist = props.savedEvents.map((event, i) => {
        return(
        <div>
            <h4 compact>{event.lineup[0]} {event.datetime} {event.venue.city}</h4>
            <form action={event.offers[0].url} method="get">
                <button>Tickets</button>
            </form>
        </div> 
        )
    })

    // const artistList = props.favArtists.map((fav, i) => {
    //     return(
    //         <div>
    //             <Button compact onClick={props.clickArtistOnList}>{fav}</Button>
    //             <Button.Group basic size='small'>
    //                 <Button onClick={props.removeArtistFromList} icon='delete' />
    //             </Button.Group>
    //         </div> 
    //         )
    //     })





    return(
        <div> 
            
          <p>Saved Events:</p>
          {eventlist}
      
        </div>
    )
}



export default SavedEvents;
