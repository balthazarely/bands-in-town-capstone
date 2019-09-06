import React from 'react';
import { Grid, Button, Popup, Divider, Segment } from 'semantic-ui-react'


const style = {
    borderRadius: 0,
    opacity: 0.7,
    padding: '2em',
  }


const ConcertContainer = (props) => {
    const concertList = props.concert.map((singleConcert, i) => {
    // console.log(props.concert, " < concert info in ConcertContainer") 

    // console.log(props.concert[0].lineup)
    
    const artistLoop = props.concert[i].lineup.map((artist, i) => {
        return (
            <div>
                {artist}
            </div>
        )
    })


        return (
            <Grid.Row  key={i} columns={2}>
                <div></div>
             
                    <Grid.Column width={4} >
                        <h2 className="lineup">{singleConcert.lineup[0]}</h2>
                        <Grid.Column width={4} >
                         <Button name={singleConcert.datetime} value={singleConcert} onClick={props.addShowToList.bind(this, singleConcert)} color="orange" size='small'>+</Button>
                         </Grid.Column>
                 

                    </Grid.Column>
                    <Grid.Column width={10}>
                    <h4 className="push-left lineup2">{singleConcert.venue.name}</h4>
                        <p className="push-left">{singleConcert.datetime}</p>
                        <h4 className="push-left lineup2">{singleConcert.venue.city}, {singleConcert.venue.country}</h4>
                    
                        <div className="push-left">
                        <Button.Group  size='tiny'>
                        <Button>Tickets</Button>
                       
                        <Popup
                        content={artistLoop}
                        on='click'
                        position='right center'
                        pinned
                        trigger={<Button content='Full Lineup' />}
                        />
                                                                        
                        </Button.Group>{/* <p>{artistLoop}</p> */}
                        </div>
                  
        
                    {/* <Button className="verticle-center"  color="orange" content='Add Show' name={singleConcert.datetime} value={singleConcert} onClick={props.addShowToList.bind(this, singleConcert)} /> */}
                    
                    

                    {/* <Button name={singleConcert.datetime} value={singleConcert} onClick={props.addShowToList.bind(this, singleConcert)}>
                            <Icon name='plus'/>
                        </Button>  */}
                         <Divider />
                    </Grid.Column>
 
                        
                  
              

                </Grid.Row>

                 
                
       
        )   
    })

    return(
        <Grid stackable columns={2}>
            {concertList}
        </Grid>
    )
}









export default ConcertContainer;




// import React from 'react';
// import { Grid, Button, Icon } from 'semantic-ui-react'






// const ConcertContainer = (props) => {
//     const concertList = props.concert.map((singleConcert, i) => {
//     console.log(props.concert, " < concert info in ConcertContainer") 

//     // console.log(props.concert[0].lineup)
    
//     const artistLoop = props.concert[i].lineup.map((artist, i) => {
//         return (
//             <div>
//                 {artist}
//             </div>
//         )
//     })


//         return (
//             <Grid.Row  key={i} columns={2}>
//                 <Grid.Column >
//                     {/* <Image src='/images/wireframe/paragraph.png' /> */}
//                     <h3>{singleConcert.lineup[0]}</h3>
//                     <Button icon name={singleConcert.datetime} value={singleConcert} onClick={props.addShowToList.bind(this, singleConcert)}>
//                         <Icon  name='plus'/>
//                     </Button> 
//                     <br/>
//                     <button> tickets</button> <button> More Info</button> 


//                 </Grid.Column>
//                 <Grid.Column>
//                     {/* <Image src='/images/wireframe/paragraph.png' /> */}
                    
                    
//                     <h4 className="venue">{singleConcert.venue.name}</h4>
//                     <p>{singleConcert.datetime}</p>
//                     <h5>{singleConcert.venue.city}, {singleConcert.venue.country}</h5>
//                     {/* <p>{artistLoop}</p> */}

//                 </Grid.Column>
//             </Grid.Row>
//         )   
//     })

//     return(
//         <Grid  divided='vertically'>
//             {concertList}
         
//         </Grid>
//     )
// }



// export default ConcertContainer;
