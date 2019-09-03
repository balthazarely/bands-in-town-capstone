import React, { Component } from 'react';

class User extends Component {
    constructor() {
        super()
        this.state = {
            name: "Name",
            location: "Denver",
            favoriteBand: "Wilco"

        } 
    }

render(){
    return(
        <div>
            <h3> User  Details</h3>
            <p>Name: {this.state.name}</p>
            <p>location: {this.state.location}</p>
            <p>Favoirte Band: {this.state.favoriteBand}</p>
        </div>
    )
}
}



export default User;
