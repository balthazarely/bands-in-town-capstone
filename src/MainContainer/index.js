import React, { Component} from 'react';
import ConcertContainer from '../ConcertContainer';
import SimilarArtistsContainer from '../SimilarArtistsContainer';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Image, Segment } from 'semantic-ui-react'
import LogoHeader from '../Header';
import TopSongs from '../TopSongs';
import ArtistContainer from '../ArtistContainer';
import EventContainer from '../EventContainer';
import User from '../User';



class MainContainer extends Component {
    
    constructor() {
        super()

        this.state = {
            artistData: [],
            concertData: [],
            searchTerm: '',
            simularAtist: '',
            fethchedArtistId: '',
            similarArtistsData: [],
            locationID: '6404',
            locationData: [],
            loading: true,
            ready: false
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)

    }
    

    
   
     // this changes the state of the search 
     handleTermChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }


    // function that allows the search function to work when enter is pressed
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
          ready: false,
          simularAtist: this.state.searchTerm
        })
        this.componentDidMount();
    }

    clickedSimilarArtist = (e) => {
        e.preventDefault();
        this.setState({
            searchTerm: e.target.value
        })
        console.log("you clicked ", [e.target.value])
        console.log(this.state.similarArtistsData, " <-- similar artist DATA")
    }

    addShowToList = (e) => {
        console.log("you clicked button", [e.target.name])
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
        const response4 = await fetch(` http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${this.state.simularAtist}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
        const json4 = await response4.json();


        //fetch artist ID
        const response5 = await fetch(`https://api.songkick.com/api/3.0/search/artists.json?apikey=viaZLZfjblo2eWh5&query=${this.state.searchTerm}`);
        const json5 = await response5.json();
        console.log(json5.resultsPage.results.artist[0].id, " ARTIST ID");

        // need to have a second fetch that will add the id from this into another fetch to serach by artist ID

        //fetch based on area
        const response6 = await fetch(`https://api.songkick.com/api/3.0/metro_areas/${this.state.locationID}/calendar.json?apikey=viaZLZfjblo2eWh5`);
        const json6 = await response6.json();

        // console.log(json6, " < events in location");

        this.setState({
            artistData: json,
            topSongs: json4,
            concertData: [...json2],
            similarArtistsData: [json3],
            fethchedArtistId: [json5],
            locationData: [json6],
            loading: false
        });
       
    }

    
  

    render() {
        
         return (
             
             <div>
                <LogoHeader />
                <Grid stackable columns={3}>
                    <Grid.Column width={4}>
                        <Segment>
                            <Image src={this.state.artistData.image_url}/>
                            <h2>{this.state.artistData.name}</h2>
                        </Segment>
                        {/* <Segment>
                            {this.state.loading ? "Artists Loading..." : <ArtistContainer data={this.state.fethchedArtistId} />}
                        </Segment> */}
                        <Segment>
                            {this.state.loading ? "Simular Artist Loading..." : <SimilarArtistsContainer similarArtists={this.state.similarArtistsData} clickedSimilarArtist={this.clickedSimilarArtist} />}
                        </Segment>
                        <Segment>
                            {this.state.loading ? "Simular Photo Loading..." : <TopSongs topSongs={this.state.topSongs} />}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Segment>
                            <div className="search-form">
                                <form inline onSubmit={this.handleSubmit}>
                                    <input type="text" name="searchTerm" id="IDK" placeholder="Search Artist..." value={this.state.searchTerm} onChange={this.handleTermChange}/>
                                    <button>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </Segment>
                        <Segment>
                            {this.state.loading ? "Loading...." : <ConcertContainer concert={this.state.concertData} addShowToList={this.addShowToList}/>}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Segment>
                            <User />
                        </Segment>
                        <Segment>
                            <h2> Events Nearby</h2>
                            {this.state.loading ? "Artists Loading..." : <EventContainer event={this.state.locationData} />}
                        </Segment>
                    </Grid.Column>
                </Grid>
  
                </div>
         
        )
    }
}

export default MainContainer;




// import React, { Component} from 'react';
// import ConcertContainer from '../ConcertContainer';
// import SimilarArtistsContainer from '../SimilarArtistsContainer';
// import 'semantic-ui-css/semantic.min.css';

// import Input from '@material-ui/core/Input';
// import Button from '@material-ui/core/Button';
// import { Grid, Image } from 'semantic-ui-react'
// import LogoHeader from '../Header';
// import TopSongs from '../TopSongs';
// import ArtistContainer from '../ArtistContainer';
// import EventContainer from '../EventContainer';
// import User from '../User';



// class MainContainer extends Component {
    
//     constructor() {
//         super()

//         this.state = {
//             artistData: [],
//             concertData: [],
//             searchTerm: '',
//             simularAtist: '',
//             fethchedArtistId: '',
//             similarArtistsData: [],
//             locationID: '6404',
//             locationData: [],
//             loading: true,
//             ready: false
//         }
//         this.handleTermChange = this.handleTermChange.bind(this);
//         this.componentDidMount = this.componentDidMount.bind(this)

//     }
    

    
   
//      // this changes the state of the search 
//      handleTermChange = (e) => {
//         this.setState({[e.target.name] : e.target.value});
//     }


//     // function that allows the search function to work when enter is pressed
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.setState({
//           ready: false,
//           simularAtist: this.state.searchTerm
//         })
//         this.componentDidMount();
//     }


//      // this should allow whatever is clicked to be added to the search, and then fire
//     //  similarArtistClick = (e) => {
//     //     console.log(e.target.value, " <-- e.target.value")
//     //     console.log(e.target.name, " <-- e.target.value")
//     //     e.preventDefault();
//     //     this.setState({
//     //         [e.target.name] : e.target.value,
//     //         ready: false,
//     //         simularAtist: this.state.searchTerm
//     //     })
//     //     this.componentDidMount()
//     // }

//     // Get the API data
//     componentDidMount = async () => {
//         //this is the artist data from the API
//         const response = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}?app_id=3668f547a226ff2fa06663c1ed8d39cc`);
//         const json = await response.json();
//         //this is the venue/event data from the api
//         const response2 = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}/events?app_id=3668f547a226ff2fa06663c1ed8d39cc&date=upcoming`);
//         const json2 = await response2.json();
//         //this is the last.fm api request
//         const response3 = await fetch(` http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${this.state.simularAtist}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
//         const json3 = await response3.json();
//         const response4 = await fetch(` http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${this.state.simularAtist}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
//         const json4 = await response4.json();


//         //fetch artist ID
//         const response5 = await fetch(`https://api.songkick.com/api/3.0/search/artists.json?apikey=viaZLZfjblo2eWh5&query=${this.state.searchTerm}`);
//         const json5 = await response5.json();
//         console.log(json5.resultsPage.results.artist[0].id, " ARTIST ID");

//         // need to have a second fetch that will add the id from this into another fetch to serach by artist ID

//         //fetch based on area
//         const response6 = await fetch(`https://api.songkick.com/api/3.0/metro_areas/${this.state.locationID}/calendar.json?apikey=viaZLZfjblo2eWh5`);
//         const json6 = await response6.json();

//         // console.log(json6, " < events in location");

    
    
       
//         this.setState({
//             artistData: json,
//             topSongs: json4,
//             concertData: [...json2],
//             similarArtistsData: [json3],
//             fethchedArtistId: [json5],
//             locationData: [json6],
//             loading: false
//         });
       
//     }

    
  

//     render() {
        
//          return (
             
//              <div>
//                 <LogoHeader />
//                 <Grid>
//                 <Grid.Column width={4}>
//                 <User />
//                 <Image src={this.state.artistData.image_url}/>
//                 <h2>{this.state.artistData.name}</h2>
//                 {this.state.loading ? "Artists Loading..." : <ArtistContainer data={this.state.fethchedArtistId} />}
//                 {this.state.loading ? "Simular Artist Loading..." : <SimilarArtistsContainer similarArtists={this.state.similarArtistsData} />}
//                 {this.state.loading ? "Simular Photo Loading..." : <TopSongs topSongs={this.state.topSongs} />}

//                 </Grid.Column>
//                 <Grid.Column width={9}>
            
//                     <div className="search-form">
//                             <form inline onSubmit={this.handleSubmit}>
//                             <Input type="text" name="searchTerm" id="IDK" placeholder="Search Artist..." value={this.state.searchTerm} onChange={this.handleTermChange}/>
//                             <button>
//                                 Submit
//                             </button>
 
//                             </form>
//                     </div>
                 
//                 {this.state.loading ? "Loading...." : <ConcertContainer concert={this.state.concertData} />}
//                 </Grid.Column>
//                 <Grid.Column width={3}>
//                     <h2> Events Nearby</h2>
//                 {this.state.loading ? "Artists Loading..." : <EventContainer event={this.state.locationData} />}

//                 </Grid.Column>
//             </Grid>
//           </div>
          
            
         
//         )
//     }
// }

// export default MainContainer;




// lastFM 
// key d6f78535b00f29193d52a517f0d13935
// secret 4be46efda40498c3335c38ec524c0d1f

// discogs
// Consumer Key	pCWYKlZxccOPdMTMBbJt
// Consumer Secret	XoHMEjNbGHwMAaTGlhrAtvlfsCBsElqL
// Request Token URL	https://api.discogs.com/oauth/request_token
// Authorize URL	https://www.discogs.com/oauth/authorize
// Access Token URL	https://api.discogs.com/oauth/access_token


// <div class='embed-container'>
//                 <iframe src='https://embed.spotify.com/?uri=spotify:track:24lMtPOCzP5g4hrg3NklLa' 
//                 frameborder='0' allowtransparency='true'></iframe>
//                 </div>

{/* <div>

                
<h1>ConcertFinder</h1>

<div className="search-form">
    <form inline onSubmit={this.handleSubmit}>
        <input type="text" name="searchTerm" id="IDK" placeholder="Search Artist..." value={this.state.searchTerm} onChange={this.handleTermChange}/>
    <button>Submit</button>
    </form>
</div>

<h2>{this.state.artistData.name}</h2>
{this.state.loading ? "Simular Artist Loading..." : <SimilarArtistsContainer similarArtists={this.state.similarArtistsData} />}
<img src={this.state.artistData.image_url}/>
{this.state.loading ? "Loading...." : <ConcertContainer concert={this.state.concertData} />}

</div> */}





// lastFM 
// key d6f78535b00f29193d52a517f0d13935
// secret 4be46efda40498c3335c38ec524c0d1f

// discogs
// Consumer Key	pCWYKlZxccOPdMTMBbJt
// Consumer Secret	XoHMEjNbGHwMAaTGlhrAtvlfsCBsElqL
// Request Token URL	https://api.discogs.com/oauth/request_token
// Authorize URL	https://www.discogs.com/oauth/authorize
// Access Token URL	https://api.discogs.com/oauth/access_token


// <div class='embed-container'>
//                 <iframe src='https://embed.spotify.com/?uri=spotify:track:24lMtPOCzP5g4hrg3NklLa' 
//                 frameborder='0' allowtransparency='true'></iframe>
//                 </div>

{/* <div>

                
<h1>ConcertFinder</h1>

<div className="search-form">
    <form inline onSubmit={this.handleSubmit}>
        <input type="text" name="searchTerm" id="IDK" placeholder="Search Artist..." value={this.state.searchTerm} onChange={this.handleTermChange}/>
    <button>Submit</button>
    </form>
</div>

<h2>{this.state.artistData.name}</h2>
{this.state.loading ? "Simular Artist Loading..." : <SimilarArtistsContainer similarArtists={this.state.similarArtistsData} />}
<img src={this.state.artistData.image_url}/>
{this.state.loading ? "Loading...." : <ConcertContainer concert={this.state.concertData} />}

</div> */}



