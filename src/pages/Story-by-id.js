import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBarCustom from './AppBarCustom'
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch, Link, withRouter } from "react-router-dom";
var divStyle = {
    display: 'flex',
    flexDirection: 'column',
    background: "#cceeff",
    padding: "20px",
    margin: "20px",
    alignItems: 'center',
    justifyContent: 'center',
};
function StorybyId(props) {
    var loggedIn = localStorage.getItem('loggedIn');
    var uid = localStorage.getItem('uid')
    console.log(loggedIn)
    console.log(uid)
    const [stories, setStories] = useState([])
    useEffect(
        () => {
            getAllstories();
        }, []
    );
    const getAllstories = () => {
        axios.get(`http://localhost:3001/posts/` + props.match.params.pid)
            .then(res => {
                const stories = res.data;
                setStories(stories);
                if (uid === stories.uid) { localStorage.setItem('pid', stories.pid) }
            })
            ;
    }
    const [open, setOpen] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleYes = () => {
        var pid = localStorage.getItem('pid')
        console.log(pid)
        axios.delete(`http://localhost:3001/posts/` + pid,
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(res => {
                setDeleted(true)
            }
            ).catch(Error)
            ;
        setOpen(false);
    };
    return (
        <div>
            <AppBarCustom />
            {deleted === true && <div style={{ color: '#ff0000', fontSize: '30px', fontWeight: 'bolder', fontFamily: 'serif' }}><p >Successfully deleted!</p></div>}
            {deleted === false && <div style={divStyle} >

                <div style={{ color: '#193366', fontSize: '30px', fontWeight: 'bolder', fontFamily: 'serif' }} href={'posts/' + stories.pid}>{stories.title}</div>
                <div style={{ fontFamily: 'serif' }}>{stories.story}</div>
                <Grid container direction='row-reverse' >
                    <Grid item >
                        <div style={{ color: '#009933', fontWeight: 'bold', fontFamily: 'cursive' }}>
                            <p > - {stories.uid}
                            </p>
                        </div>
                    </Grid>
                    {uid === stories.uid && <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <Button href="/Edit-story" variant='contained' color='primary'>Edit</Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant='contained' color='primary' onClick={handleClickOpen}>Delete</Button>
                        </Grid>
                    </Grid>}
                </Grid>
            </div>}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you really want to delete your story?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
          </Button>
                    <Button onClick={handleYes} color="primary" autoFocus>
                        Yes
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default withRouter(StorybyId)