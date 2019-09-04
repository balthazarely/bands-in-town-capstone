import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'


const User = (props) => {
    const artistList = props.favArtists.map((fav, i) => {
    return(
        <div>
            <Button compact onClick={props.clickArtistOnList}>{fav}</Button>
            <Button.Group basic size='small'>
                <Button onClick={props.removeArtistFromList} icon='delete' />
            </Button.Group>
        </div> 
        )
    })

    // const event = props.savedEvents.artistId.map((id, i) => {
    //     return(
    //         <div>
    //             <p>id</p>
    //         </div>
    //     )
    // })
    


    return(
        <div> 
          <p>Username: {props.name}</p>
          <p>Location: {props.location}</p>
       
          <p>Favorite Artists:</p>
          {artistList}
      
        </div>
    )
}



export default User;
