import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import AppBarCustom from './AppBarCustom'
var divStyle = {
  display: 'flex',
  flexDirection: 'column',
  background: "#cceeff",
  padding: "20px",
  margin: "20px",
  alignItems: 'center',
  justifyContent: 'center',
};
export default function Story() {
  const [stories, setStories] = useState([])
  useEffect(
    () => {
      getAllstories();
    }, []
  );
  const getAllstories = () => {
    axios.get(`http://localhost:3001/posts`)
      .then(res => {
        const stories = res.data;
        setStories(stories);
      })
      ;
  }
  return (
    <div>
      <AppBarCustom />
      <ul>
        {stories.map(stories =>

          <div style={divStyle} >
            <div style={{ color: '#193366', fontSize: '30px', fontWeight: 'bolder', fontFamily: 'serif' }} href={'posts/' + stories.pid}>{stories.title}</div>
            <div style={{ fontFamily: 'serif' }}>{stories.story}</div>
            <Grid container direction='row-reverse' >
              <Grid item >
                <div style={{ color: '#009933', fontWeight: 'bold', fontFamily: 'cursive' }}>
                  <p > - {stories.uid}
                  </p>
                </div>
              </Grid>
            </Grid>
            <Link to={'posts/' + stories.pid}>see full story</Link>
          </div>
        )}
      </ul>
    </div>
  )
}
