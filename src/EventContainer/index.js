import React, { Component } from 'react';



const EventContainer = (props) => {
    // console.log(props.concert, " < concert info in ConcertContainer") 

    // console.log(props.event[0].resultsPage.results.event, " < props in eventContainer")
        const events = props.event[0].resultsPage.results.event.map((event, i) => {

        return (
            <div key={i}>
                <h5>{event.displayName}</h5> 
            </div> 
        )   
    })

    return(
        <div>
            <h3> Events Nearby</h3>
            {events}
        </div>
    )
}



export default EventContainer;

