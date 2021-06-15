import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Cookies from 'universal-cookie';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
const theme=createMuiTheme({
  typography:{
    h2:{
      fontSize:24,
      marginBottom:20
    }
  },
  palette:{
   primary :{
     main:'#0099cc',
   },
   secondary:{
     main:'#000000'
   }
  }
})
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

export default function CreateStory() {
    const [created, setCreated] = React.useState(false);
  const classes = useStyles();
  const [values, setValues] = useState({
    story:'',
    title:'',
   
});
const handleChange = name => e => {
  setValues({ ...values, [name]: e.target.value }); 
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    var token=cookies.get('Authorization');
    console.log(token)
    const { story, title} = values;
    const storyObj = {story, title};
   //var token= localStorage.getItem('token')
   axios.post('http://localhost:3001/posts', storyObj,{
    headers: {
      'Authorization': localStorage.getItem('token') 
    }
  }).then(res => {
      console.log(storyObj);
     
      if(res.status===201) {
        setCreated(true);
      }
    }).catch(error => {
      
       
         setValues({msg:false,message:'failed'})
     
      
     })
    
          
}

//useEffect(() => {      });
  return (
      <div>
    {created===true &&<div  style={{color: 'primary' ,fontSize:'30px',fontWeight:'bolder',fontFamily:'serif'}}><p >Saved!</p></div>}
    {created===false&&<Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <div className={classes.paper}>
     
     { values.message==='failed' && <Alert severity="error">failed</Alert>
      }
     
        <Typography component="h1" variant="h5">
         Create Story
        </Typography>
        <ThemeProvider theme={theme} >
        <form className={classes.form} Validate onSubmit={handleSubmit}>
          <TextField
           variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            value={values.title}
            onChange={handleChange('title')}
            
            autoFocus
           
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="story"
            label="Story"
            id="story"
            onChange={handleChange('story')}
            value={values.story}
            multiline
            rows={6}
          />
          
         
         
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            
          >
            Create
          </Button>
        
         
        </form>
        </ThemeProvider>
      </div>
      <Box mt={8}>
      
      </Box>
    </Container>}
    </div>
  );
}
