import React, { Component } from 'react';
import { Grid, Card } from 'semantic-ui-react'


const SimilarArtistsContainer = (props) => {
    // console.log(props.similarArtists, "< SimularArtists inside similarArtistsContainer")
    // console.log(props.similarArtists[0].similarartists.artist[0])
    // const artist = props.similarArtists[0].similarartists.artist[0].name
    const artist = props.similarArtists[0].similarartists.artist.slice(0, 4).map((artist, i) => {
        // console.log(props.similarArtists[0].similarartists.artist)

        return (
            <div>
                <button value={artist.name} onClick={props.clickedSimilarArtist}>{artist.name}</button>
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
