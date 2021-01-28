import React, { Component } from 'react';


import Grid from '@material-ui/core/Grid';

const containerStyles = {
  height: 30,

  backgroundColor: "#e0e0de",
  borderRadius: 0,
  margin: 20
}
const labelStyles = {
  padding: 5,
  color: 'white',
  fontWeight: 'bold',
  display: 'inherit',
  position:'absolute'
}


export class Progress extends Component {
  

 render() {
    
    const progressList =this.props.progressData.map((progress) =>
    <Grid xs={12}  
  
    justify="center" key={progress.Id} progress>
    
      <div style={containerStyles}>   
          <div style={{
                      height: '100%',
                      maxWidth: "100%",
                      width: `${progress.completed}%`,
                      backgroundColor: `${progress.bgcolor}`,
                      borderRadius: 'inherit',
                      textAlign: 'right',
                      transition: 'width 1s ease-in-out',
                      }} >   
              <span id={progress.Id}  style={labelStyles}>{`${progress.completed}%` }</span>               
                
             </div>   
   
        </div> 
    
    </Grid>
   );
    return (progressList);
  }
}
export default Progress;

