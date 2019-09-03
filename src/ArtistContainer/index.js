import React, { Component } from 'react';

class ArtistContainer extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.data, " < props in Artist Container")
        this.state = {
            artistIdData: [],
            ready: false
        } 
    }
    
    componentDidMount(){
        this.addArtistID();
        this.lookInsideState();
    }

    addArtistID = () => {
        this.setState({
            artistIdData: this.props.data,
            ready: true
        })
    }

    lookInsideState = () => {
        if(this.state.ready == true){
            console.log(this.state)
    }}
   
    


    // console.log(props.data[0].resultsPage.results.artist[0], " <-- Data inside the Artist Container")
render(){
    return(
        <div>
            <h3> Artists  Details</h3>
            <ul>
                {/* <li>ID: {props.data[0].resultsPage.results.artist[0].id}.</li>
                <li>ID: {props.data[0].resultsPage.results.artist[0].displayName}.</li> */}
            </ul>
     
        </div>
    )
}
}



export default ArtistContainer;
