import React from 'react'
import '../App.css';
import logo from '../storytellers.png';
import { useEffect, useState } from 'react';
import {  ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ToolBar from '@material-ui/core/ToolBar'
const theme=createMuiTheme({
  typography:{
    h2:{
      fontSize:24,
      marginBottom:20
    }
  },
  palette:{
   primary :{
     main:'#ffb366',
   },
   secondary:{
     main:'#fffff'
   }
   
  }
})

function App() {
   const [loggedIn,setLoggedIn]=useState(false)
   
        useEffect(
            ()=>{
              if (localStorage && localStorage.getItem('loggedIn')) {
                setLoggedIn(  JSON.parse(localStorage.getItem('loggedIn')));
                }  
            }
        )
        console.log(loggedIn)
  return (
   
    <div>
     
      <ThemeProvider theme={theme}>

      <AppBar position="flex" color='primary'>
      <ToolBar>
        <Grid container spacing={2}>
          
          <Grid item xs={0}> 
          <img src={logo} height={80} width={80}/>
  
          </Grid>
          <Grid item xs={8}>
          <Typography  variant='h2' >
        <p >Story Tellers</p>
        </Typography>
          </Grid>
          <Grid item xs={1}>
        <Button href="/Story">Story</Button>
          </Grid>
          <Grid item xs={1}>
         {loggedIn===false && <Button  href="/Register">Sign up</Button>}
         {loggedIn===true && <Button href="/Create-story" >Create</Button>}
          </Grid>
          <Grid item xs={1}>
     
          {loggedIn===false&&<Button id='signin' href="/Login">Sign in</Button>}
      
          {loggedIn===true&&<Button  id='signout' href="/Logout">Sign out</Button>}
          </Grid>
        </Grid>
      </ToolBar>
    </AppBar>
    </ThemeProvider>
    </div>
  );
}

export default App;
