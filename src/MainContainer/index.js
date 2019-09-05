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
import SavedEvents from '../SavedEvents';
import BackgroundImagePage from '../BackgroundImagePage';
import Welcome from '../Welcome';


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
            savedEvents: [],
            favArtists: [],
            //this is the user state stuff
            name: "joe shmmo",
            location: "Denver",
            modalOpen: false,
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
    }

    addShowToList = (singleConcert, e) => {
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

    // filterSearchResults = (e) => {
    //     this.setState({
    //         filterCity: e.target.value
    //     });
    //     console.log("filter form has been hit")
    //     console.log(this.state.filterCity)
    // }

    openUserInfomation = () => {
        console.log("Edit button was clicked ")
        this.setState({
            modalOpen: true
        })
    }


    // Get the API data
    componentDidMount = async () => {
       
        //this is the artist data from the API
        const response = await fetch(`https://rest.bandsintown.com/artists/${this.state.searchTerm}?app_id=3668f547a226ff2fa06663c1ed8d39cc`);
        const json = await response.json();

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

        //fetch based on area
        const response6 = await fetch(`https://api.songkick.com/api/3.0/metro_areas/${this.state.locationID}/calendar.json?apikey=viaZLZfjblo2eWh5`);
        const json6 = await response6.json();

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

    //turn off/on the opacity classes based on searches
    // opacityChanger = () => {

    // }
    
  

    render() {
         return (
             <div class="bg">
                 <div class="content-holder">
                <LogoHeader />
           
                <Grid stackable columns={3}>
                    <Grid.Column width={16}>
                        <div>
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
                        </div>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={3}>
                    <Grid.Column width={4} className={this.state.loading ? 'opacityON' : 'opacityOFF'}>
                        <div>
                            <Image className="artist-image" src={this.state.artistData.image_url}/>
                            <h1 className="artist-name-display">{this.state.artistData.name}</h1>
                            <Button className="plus-icon" color="orange" icon value={this.state.artistData.name} onClick={this.addArtistToList}>
                                <Icon name='plus'/>
                            </Button>
                        </div>
                        <div className="gray-card">
                            {this.state.loading ? "Similar Artist Loading..." : <SimilarArtistsContainer similarArtists={this.state.similarArtistsData} clickedSimilarArtist={this.clickedSimilarArtist} />}
                        </div>
                        <div className="gray-card">
                            {this.state.loading ? "Top Songs Loading..." : <TopSongs topSongs={this.state.topSongs} />}
                        </div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      
                        <Segment className={this.state.loading ? 'opacityON' : 'opacityOFF'}>
                            {this.state.loading ? "Artist Concerts Loading...." : 
                            <ConcertContainer concert={this.state.concertData} addShowToList={this.addShowToList}/>}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column className={this.state.loading ? 'opacityON' : 'opacityOFF'} width={4}>
                        <div className="gray-card-nomargintop">
                            
                            <User removeArtistFromList={this.removeArtistFromList}
                            clickArtistOnList={this.clickArtistOnList} 
                            name={this.state.name} 
                            favArtists={this.state.favArtists}
                            location={this.state.location}/>
                        </div>
                        <Segment>
                            {this.state.savedEventsReady === false ? "Saved Events Loading" : 
                            <SavedEvents savedEvents={this.state.savedEvents} removeShowFromList={this.removeShowFromList} />}
                        </Segment>
                        <Segment>
                            {this.state.loading ? "Nearby Events Loading..." : <EventContainer event={this.state.locationData} />}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
         
        )
    }
}

export default MainContainer;


               