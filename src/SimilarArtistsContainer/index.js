import React, { Component } from 'react';


const SimilarArtistsContainer = (props) => {
    // console.log(props.similarArtists, "< SimularArtists inside similarArtistsContainer")
    // console.log(props.similarArtists[0].similarartists.artist[0])
    // const artist = props.similarArtists[0].similarartists.artist[0].name
    const artist = props.similarArtists[0].similarartists.artist.slice(0, 10).map((artist, i) => {
        // console.log(props.similarArtists[0].similarartists.artist)
        // console.log(props.similarArtists[0].similarartists.url, " <-- photo in container")


        return (
            <div>
               <a onClick={props.clickedSimilarArtist}>{artist.name}</a>
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
