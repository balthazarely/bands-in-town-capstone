import React from 'react';
import { Button, Divider} from 'semantic-ui-react'



const UserInfo = (props) => {
    // const artistList = props.favArtists.map((fav, i) => {
        // console.log(props.favArtists, " <-- adding artist to the favoriteList")
    // return(
    //     <div key={i}>
      
    //     </div> 
    //     )
    // })


    return(
        <div> 
            <Divider className="white" inverted horizontal><h3> User Info </h3></Divider>
            <p className="white">User: {props.name} <br/>Location: Denver</p>
            
            <Button inverted color="orange">Change Location</Button>
        
{/*       
            <Button inverted className="plus-icon" color="orange" icon value={this.state.artistData.name} onClick={this.addArtistToList}>
                <Icon name='plus'/>
            </Button> */}
        
  
        </div>
    )
}



export default UserInfo;
