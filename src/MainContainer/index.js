import React, { Component, Suspense, Fragment } from 'react';
import ConcertContainer from '../ConcertContainer';
import SimilarArtistsContainer from '../SimilarArtistsContainer';

class MainContainer extends Component {
    constructor() {
        super()

        this.state = {
            artistData: [],
            concertData: [],
            searchTerm: '',
            simularAtist: 'sts9',
            similarArtistsData: [],
            loading: true,
            ready: false
        }
        this.handleTermChange = this.handleTermChange.bind(this);
    }


     // this changes the state of the search 
     handleTermChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }


    // function that allows the search function to work when enter is pressed
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
          ready: false
        })
        this.componentDidMount()
    }


    // Get the API data
    componentDidMount = async () => {
        //this is the artist data from the API
        const response = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}?app_id=3668f547a226ff2fa06663c1ed8d39cc`);
        const json = await response.json();
        //this is the venue/event data from the api
        const response2 = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}/events?app_id=3668f547a226ff2fa06663c1ed8d39cc&date=upcoming`);
        const json2 = await response2.json();
        //this is the last.fm api request
        const response3 = await fetch(` http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${this.state.simularAtist}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
        const json3 = await response3.json();
        console.log(json3 , " this is the simular artists object")
        console.log(json3.similarartists.artist[0].name)

       
        this.setState({
            artistData: json,
            concertData: [...json2],
            similarArtistsData: [json3],
            loading: false
        });
       
    }

    render() {
         return (
            <div>
                <h1>ConcertFinder</h1>

                <div className="search-form">
                    <form inline onSubmit={this.handleSubmit}>
                        <input type="text" name="searchTerm" id="IDK" placeholder="Search Artist..." value={this.state.searchTerm} onChange={this.handleTermChange}/>
                    <button>Submit</button>
                    </form>
                </div>

                <h4>{this.state.artistData.name}</h4>
                {this.state.loading ? "Simular Artist Loading..." : <SimilarArtistsContainer similarArtists={this.state.similarArtistsData} />}
                <img src={this.state.artistData.image_url}/>
                {this.state.loading ? "Loading...." : <ConcertContainer concert={this.state.concertData} />}

            </div>
        )
    }
}

export default MainContainer;



// lastFM 
// key d6f78535b00f29193d52a517f0d13935
// secret 4be46efda40498c3335c38ec524c0d1f


