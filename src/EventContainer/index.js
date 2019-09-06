import React from 'react';
import { Divider, Button, Card, Image } from 'semantic-ui-react'



const EventContainer = (props) => {
    console.log(props.concert, " < concert info in ConcertContainer") 


    console.log(props.event[0].resultsPage.results.event, " < props in eventContainer")
        const events = props.event[0].resultsPage.results.event.map((event, i) => {

        return (
            <Card>
            <Card.Content>
              <Card.Description><h5>{event.performance[0].displayName}</h5></Card.Description>
              <Card.Description>{event.venue.displayName}</Card.Description>

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



// import React from 'react';



// const EventContainer = (props) => {
//     // console.log(props.concert, " < concert info in ConcertContainer") 

//     console.log(props.event[0].resultsPage.results.event, " < props in eventContainer")
//         const events = props.event[0].resultsPage.results.event.map((event, i) => {

//         return (
//             <div key={i}>
//                 <h5>{event.displayName}</h5> 
//             </div> 
//         )   
//     })

//     return(
//         <div>
//             <h3> Events Nearby</h3>
//             {events}
//         </div>
//     )
// }



// export default EventContainer;

