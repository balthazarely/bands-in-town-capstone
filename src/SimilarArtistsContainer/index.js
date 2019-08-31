import React, { Component } from 'react';





const SimilarArtistsContainer = (props) => {
    // console.log(props.similarArtists, "< SimularArtists inside similarArtistsContainer")
    // console.log(props.similarArtists[0].similarartists.artist[0].name)
    // const artist = props.similarArtists[0].similarartists.artist[0].name
    const artist = props.similarArtists[0].similarartists.artist.slice(0, 5).map((artist, i) => {

        return (
            <div>
               <h5>{artist.name}</h5>
            </div> 
        
        )   
        
    })
    



   
   



    return(

        <div>
            <h3> Similar Artists </h3>
            {artist}
            
        </div>
    )
}



export default SimilarArtistsContainer;
