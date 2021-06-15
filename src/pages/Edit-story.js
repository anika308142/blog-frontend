import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Cookies from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import {  withRouter } from "react-router-dom";
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
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(5),
        },
    },
}));

function StorybyId() {
    const classes = useStyles();
    var loggedIn = localStorage.getItem('loggedIn');
    var uid = localStorage.getItem('uid')
    var pid = localStorage.getItem('pid')
    console.log(loggedIn)
    console.log(uid)
    const [stories, setStories] = useState([])
    useEffect(
        () => {
            getAllstories();
        }, []
    );
    const [values, setValues] = useState({
        story: '',
        title: '',
    });
    const getAllstories = () => {
        axios.get(`http://localhost:3001/posts/` + pid)
            .then(res => {
                const stories = res.data;
                setStories(stories);
                setValues({ story: stories.story, title: stories.title })
                if (uid === stories.uid) { localStorage.setItem('pid', stories.pid) }
            })
            ;
    }
    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };
    const [updated, setUpdated] = React.useState(false);
    const handleYes = () => {
        const cookies = new Cookies();
        var token = cookies.get('Authorization');
        console.log(token)
        const { story, title } = values;
        const storyObj = { story, title };
        axios.put('http://localhost:3001/posts/' + pid, storyObj, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => {
            console.log(storyObj);
            if (res.status === 200) {
                setUpdated(true)
            }
        }).catch(error => {
            setUpdated(false)
        })
    };
    return (
        <div >
            <AppBarCustom />
            {updated === true && <div style={{ color: 'primary', fontSize: '30px', fontWeight: 'bolder', fontFamily: 'serif' }}><p >Saved!</p></div>}
            {updated === false && <div style={divStyle} >
                <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    value={values.title}
                    onChange={handleChange('title')}
                    autoFocus
                />
                <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="story"
                    value={values.story}
                    onChange={handleChange('story')}
                    autoFocus
                />
                <Grid container direction='row-reverse' >
                    {uid === stories.uid && <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <Button variant='contained' color='primary' onClick={handleYes}>Save</Button>
                        </Grid>
                    </Grid>}
                </Grid>
            </div>}
        </div>
    )
}
export default withRouter(StorybyId)