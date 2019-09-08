import React, { Component} from 'react';
import ConcertContainer from '../ConcertContainer';
import SimilarArtistsContainer from '../SimilarArtistsContainer';
import 'semantic-ui-css/semantic.min.css';
import { Popup, Grid, Image, Segment, Button, Icon, Input, GridColumn } from 'semantic-ui-react'
import LogoHeader from '../Header';
import TopSongs from '../TopSongs';
import EventContainer from '../EventContainer';
import User from '../User';
import SavedEvents from '../SavedEvents';
import Welcome from '../Welcome';
import LoaderIcon from '../LoaderIcon';
import ArtistBio from '../ArtistBio';
import { async } from 'q';
import { parse } from '@babel/parser';
import VideoContainer from '../VideoContainer';




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
            location: "",
            //utility
            loading: true,
            savedEventsReady: false,
            ready: false
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
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
    
    // this should also be triggering adding the artist to the db.
    addArtistToList = async (e) => {
        e.preventDefault();
        this.setState({
            favArtists: [... this.state.favArtists, e.currentTarget.value]
            },function(){
        })
        console.log("you clicked ", e.currentTarget.value)
        const newFavObj = {
            newFav: e.currentTarget.value
        }
        try {
            const newFavArtist = await fetch('http://localhost:9000/auth/home', {
                method: "POST",
                body: JSON.stringify(newFavObj),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const parsedResponse = await newFavArtist.json();
            console.log(parsedResponse)
        } catch (err){

        }
    }


    GetUserInfomation = async (user) => {
        try {
            const userResponse = await fetch('http://localhost:9000/auth/home');
    
            // if(response.status !== 200){
            //     // For http errors, Fetch doesn't reject the promise on 404 or 500
            //     // throw Error(crimes.statusText);
            //     }
    
            const userInfo = await userResponse.json();
            console.log(userResponse)
        //     this.setState({movies: moviesParsed.data})
        } catch(err){
            console.log(err)
            return err
        }
    }






    removeArtistFromList = async (fav) => {
        try {
            const deleteArtist = await fetch('http://localhost:9000/auth/home' + fav, {
                method: 'DELETE'
            })
            const parsedResponse = await deleteArtist.json();
            console.log("delete ", fav)

            this.setState({
                favArtists: this.state.favArtists.filter((artist) => artist !== fav)
            })
        } catch(err) {
            console.log(err, ' error')
          }
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



    // Get the API data
    componentDidMount = async () => {
        this.GetUserInfomation();
       
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
        //artist INFO last fm
            const response7 = await fetch(`http://ws.audioscrobbler.com//2.0/?method=artist.getinfo&artist=${this.state.searchTerm}&api_key=d6f78535b00f29193d52a517f0d13935&format=json`);
            const json7 = await response7.json();
            const bioinfo = json7.artist.bio.summary
        // console.log(bioinfo)

        this.setState({
            artistData: json,
            topSongs: json4,
            concertData: [...json2],
            similarArtistsData: [json3],
            fethchedArtistId: [json5],
            locationData: [json6],
            artitsBio: bioinfo,
            loading: false
        });
    }
    
    render() {
         return (
             <div className="bg">
                 <div className="content-holder">
                <LogoHeader />
                 <Grid stackable columns={3}>
                    <Grid.Column width={16}>
                        <div>
                            <div className="search-form">
                                <form onSubmit={this.handleSubmit}>
                                    <Input size='small' icon='search' type="text" 
                                        name="searchTerm" 
                                        id="IDK" focus
                                        placeholder="Search Artist..." 
                                        value={this.state.searchTerm} 
                                        onChange={this.handleTermChange}/>
                                    <Button className="mainButton" color="orange" >
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <VideoContainer />
                    </Grid.Column>
                </Grid>

        





            
                <Grid stackable columns={3}>
                    <Grid.Column width={4} className={this.state.loading ? 'opacityON' : 'opacityOFF'}>
                        <div>
                            <Image className="artist-image" src={this.state.artistData.image_url}/>
                            <h1 className="artist-name-display">{this.state.artistData.name}</h1>
                            <Button inverted className="plus-icon" color="orange" icon value={this.state.artistData.name} onClick={this.addArtistToList}>
                                <Icon name='plus'/>
                            </Button>
                        
                            
                        </div>
                        <div className="gray-card">
                            {this.state.loading ? "Similar Artist Loading..." : <SimilarArtistsContainer similarArtists={this.state.similarArtistsData} clickedSimilarArtist={this.clickedSimilarArtist} />}
                        </div>
                        <div className="gray-card">
                            {this.state.loading ? "Top Songs Loading..." : <TopSongs topSongs={this.state.topSongs} />}
                        </div>
                        <div className="gray-card">
                            {this.state.loading ? "Top Songs Loading..." : <ArtistBio bio={this.state.artitsBio} />}
                     
                        </div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        
                        <Segment>
                            {this.state.loading ? <Welcome /> : <ConcertContainer concert={this.state.concertData} addShowToList={this.addShowToList}/>} 
                            
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
                        
                            {this.state.savedEvents.length == 0 ? null : <Segment>
                            <SavedEvents savedEvents={this.state.savedEvents} removeShowFromList={this.removeShowFromList} />  </Segment>}
                     
                        <div className="gray-card">
                            
                            {this.state.loading ? "Nearby Events Loading..." : <EventContainer event={this.state.locationData} />}
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
         
        )
    }
}

export default MainContainer;


               