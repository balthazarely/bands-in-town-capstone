import React, { Component } from 'react';

class User extends Component {
    constructor() {
        super()
        this.state = {
            name: "Name",
            location: "Denver",
            savedEvents: []

        } 
    }

render(){
    return(
        <div>
            <h3>User  Details</h3>
            <p>Name: {this.state.name}</p>
            <p>location: {this.state.location}</p>
            <p>Upcoming Events: {this.state.savedEvents}</p>
        </div>
    )
}
}

//should make this a fucntion component, and move the state of this into the parent container. 

export default User;
