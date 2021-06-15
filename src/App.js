import React from 'react'
import './App.css';
import logo from './storytellers.png';
import { useEffect, useState } from 'react';
import {Route,BrowserRouter as Router, Switch} from "react-router-dom";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Logout from "./pages/Logout";
import Story from "./pages/Story";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateStory from "./pages/Create-story";
import StorybyId from './pages/Story-by-id';
import EditStory from './pages/Edit-story'
import DeleteStory from './pages/Delete-story'

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
      
   <Router>

   <Route path="/Register" exact component={Register}/>
   <Route path="/Login" exact component={Login}/>
   <Route path="/Logout" exact component={Logout}/>
   <Route path="/Story" exact component={Story}/>
   <Route path="/Create-story" exact component={CreateStory}/>
   <Route path="/Edit-story" exact component={EditStory}/>
   <Route path="/Delete-story" exact component={DeleteStory}/>
   <Route path="/posts/:pid"><StorybyId/></Route>
    <Route path="/" exact component={Story}/>
 
    </Router>
    </div>
  );
}

export default App;
