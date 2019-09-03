import React, { Component } from 'react';



const EventContainer = (props) => {
    // console.log(props.concert, " < concert info in ConcertContainer") 

    // console.log(props.event[0].resultsPage.results.event, " < props in eventContainer")
        const events = props.event[0].resultsPage.results.event.map((event, i) => {

        return (
            <div>
                <h4>{event.displayName}</h4>
              
            </div> 
        )   
    })

    return(
        <div>
            
          {events}
        </div>
    )
}



export default EventContainer;

