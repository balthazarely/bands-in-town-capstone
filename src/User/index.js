import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'


const User = (props) => {
    const artistList = props.favArtists.map((fav, i) => {
        // console.log(props.favArtists, " <-- adding artist to the favoriteList")
    return(
        <div key={i}>
            <Button onClick={props.clickArtistOnList}>{fav}</Button>
            <Button.Group basic size='small'>
                <Button onClick={props.removeArtistFromList.bind(null, fav)} icon='delete' />
            </Button.Group>
        </div> 
        )
    })


    return(
        <div> 
          <p className="white">Username: {props.name}</p>
          <p className="white">Location: {props.location}</p>
      
        
          <p className="white">Favorite Artists:</p>
          {artistList}
        </div>
    )
}



export default User;
