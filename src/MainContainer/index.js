import React, { Component} from 'react';
import ConcertContainer from '../ConcertContainer';
import SimilarArtistsContainer from '../SimilarArtistsContainer';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Form, Image, Segment, Button, Icon, Input, Card } from 'semantic-ui-react'
import LogoHeader from '../Header';
import TopSongs from '../TopSongs';
import ArtistContainer from '../ArtistContainer';
import EventContainer from '../EventContainer';
import User from '../User';
import SavedEvents from '../SavedEvents'



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
            //this is the user state stuff
            name: "joe shmmo",
            location: "Denver",
            savedEvents: [],
            favArtists: [],
            //utility
            filterCity: '',
            loading: true,
            savedEventsReady: false,
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
        if(e) {
            e.preventDefault();}
        this.setState({
          ready: false,
          simularAtist: this.state.searchTerm
        })
        this.componentDidMount();
    }


    clickedSimilarArtist = (e) => {
        // e.preventDefault();
        this.setState({
            searchTerm: e.target.innerHTML,
            ready: false,
            simularAtist: this.state.searchTerm
        },function(){
            // console.log(this.state)
             this.handleSubmit();
        }) 
        // console.log("you clicked ", [e.target.innerHTML])
        // console.log("new STATE", this.state.searchTerm)
    }

    addShowToList = (singleConcert, e) => {
        // console.log(e.currentTarget.value)
        // console.log([e.currentTarget.name])
        
        // e.preventDefault();
        const recentAdd = singleConcert;
        // console.log(recentAdd)
        this.setState({
            savedEvents: [... this.state.savedEvents, recentAdd],
            // savedEvents: [... this.state.savedEvents, singleConcert],
        }, function() {
            this.setState({
                savedEventsReady: true
            })
            // console.log(this.state.savedEvents)
        })
    }

    addArtistToList = (e) => {
        this.setState({
            favArtists: [... this.state.favArtists, e.currentTarget.value]
        },function(){
            //  this.handleSubmit();
        }) 
        // console.log("you clicked ", [e.target.value])
        // console.log(this.state.favArtists)
    }

    removeArtistFromList = (fav) => {
        this.setState({
            favArtists: this.state.favArtists.filter((artist) => artist !== fav)
        })
        console.log("delete ", fav)
    }

    removeShowFromList = (event) => {
        this.setState({
            savedEvents: this.state.savedEvents.filter((events) => events !== event)
        })
        console.log("delete ", event)
    }

    clickArtistOnList = (e) => {
        console.log("you clicked ", [e.target.innerHTML])
        e.preventDefault();
        this.setState({
            searchTerm: e.target.innerHTML,
            ready: false,
            simularAtist: this.state.searchTerm
        },function(){
            // console.log(this.state)
             this.handleSubmit();
        }) 
    }

    filterSearchResults = (e) => {
        this.setState({
            filterCity: e.target.value
        });
        console.log("filter form has been hit")
        console.log(this.state.filterCity)
    }

    // Get the API data
    componentDidMount = async () => {
        // console.log("new STATE", this.state)
        //this is the artist data from the API
        const response = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}?app_id=3668f547a226ff2fa06663c1ed8d39cc`);
        const json = await response.json();
        //this is the event data from the api

        //BANDSINTOWN VERSION
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
        // console.log(json5.resultsPage.results.artist[0].id, " ARTIST ID");

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
                            <Button icon value={this.state.artistData.name} onClick={this.addArtistToList}>
                                <Icon name='plus'/>
                            </Button>
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
                                <form onSubmit={this.handleSubmit}>
                                    <Input type="text" 
                                        name="searchTerm" 
                                        id="IDK" focus
                                        placeholder="Search Artist..." 
                                        value={this.state.searchTerm} 
                                        onChange={this.handleTermChange}/>
                                    <Button>
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </Segment>
                        {/* <Segment>
                            <Form>
                                <Form.Field>
                                    <input type="text" name="filterCity" placeholder='filter' value={this.state.filterCity} onChange={this.filterSearchResults}/>
                                    <button>Submit</button>
                                </Form.Field>
                            </Form>
                        </Segment> */}
                        <Segment>
                            {this.state.loading ? "Loading...." : 
                            <ConcertContainer concert={this.state.concertData} addShowToList={this.addShowToList}/>}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Segment>
                            <User removeArtistFromList={this.removeArtistFromList}
                            clickArtistOnList={this.clickArtistOnList} 
                            name={this.state.name} 
                            favArtists={this.state.favArtists}
                            location={this.state.location}/>
                        </Segment>
                        <Segment>
                            {this.state.savedEventsReady === false ? "Loading...." : 
                            <SavedEvents savedEvents={this.state.savedEvents} removeShowFromList={this.removeShowFromList} />}
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
