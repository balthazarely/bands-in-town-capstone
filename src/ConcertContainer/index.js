import React, { Component } from 'react';





const ConcertContainer = (props) => {
    console.log(props.concert, "< concertList inside ConcertContainer")
     const concertList = props.concert.map((singleConcert, i) => {

        return (
            <div>
                <h5>{singleConcert.venue.name}</h5>
                <p>{singleConcert.datetime}</p>
                <h6>{singleConcert.venue.city}, {singleConcert.venue.country}</h6>
            </div> 
        )   
        
    })



   
   



    return(

        <div>
           
            {concertList}
            
        </div>
    )
}



export default ConcertContainer;

//    // const concertInfo = props.concert
//     // console.log(concertInfo, " < concert info in ConcertContainer") 
//     const concertInfo = props.concert.map(singleConcert, i) => {
//         return (
//             {beer.id}
//         )
//     }
//     console.log(concertInfo.length, "< ConcertInfo length")