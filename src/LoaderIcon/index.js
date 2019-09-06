import React from 'react';
import { Dimmer, Segment, Loader} from 'semantic-ui-react'




const LoadingIcon = () => {
   
    
        return(
            <Segment>
            <Dimmer active>
                <Loader size='small'>Loading</Loader>
            </Dimmer>
            </Segment>
        )
}
 
        
        
export default LoadingIcon;


