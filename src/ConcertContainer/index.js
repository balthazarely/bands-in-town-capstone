import React, { Component } from 'react';
import { Grid, Image, Button, Icon } from 'semantic-ui-react'




const ConcertContainer = (props) => {
    const concertList = props.concert.map((singleConcert, i) => {
    // console.log(props.concert, " < concert info in ConcertContainer") 

        return (
            <Grid.Row columns={2}>
                <Grid.Column>
                    {/* <Image src='/images/wireframe/paragraph.png' /> */}
                    <h3>{singleConcert.lineup[0]}</h3>
                    <Button icon onClick={props.addShowToList}>
                        <Icon name='plus' />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    {/* <Image src='/images/wireframe/paragraph.png' /> */}
                    <p>{singleConcert.datetime}</p>
                    <h4>{singleConcert.venue.name}</h4>
                    <h5>{singleConcert.venue.city}, {singleConcert.venue.country}</h5>
                   
                </Grid.Column>
                </Grid.Row>
    
        )   
    })

    return(
                <Grid divided='vertically'>
                   
                        {concertList}
                   
                </Grid>
    )
}



export default ConcertContainer;