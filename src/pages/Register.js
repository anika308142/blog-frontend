import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Cookies from 'universal-cookie';
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

export default function Register() {
 
  const classes = useStyles();
  const cookies= new Cookies(); 
  const [values, setValues] = useState({
    uid:'',
    password: '',
    msg:false,
    message:'',
    c_password:'',
  
});
const [warning,setWarning]=useState(null);
const handleChange = name => e => {
  setValues({ ...values, [name]: e.target.value });

  
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { uid, password } = values;
    const user = {uid, password};
    const updateWarning=values.c_password!==values.password?'Password did not match!':null;
    setWarning(updateWarning);
    console.log(values.password)
    console.log(values.c_password)
    if(!updateWarning)
   {axios.post('http://localhost:3001/users', user) .then(res => {
      console.log(res.status);
      console.log(res.data);
      if(res.status===201) {
        setValues({msg:true,message:'success',loggedIn:true})
        localStorage.setItem('loggedIn',true);
        localStorage.setItem('uid', values.uid);
localStorage.setItem('token',res.headers['authorization']);
cookies.set('Authorization', res.headers['authorization'], { path: '/' });
      }
    }).catch(error => {
      
       
      setValues({msg:false,message:'failed',loggedIn:false})
      localStorage.setItem('token','null');
     
      
     })
    }
          
}

//useEffect(() => {      });
  return (
   
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <div className={classes.paper}>
      {values.message==='success'&& <Redirect to='/Story' />}
     { values.message==='failed' && <Alert severity="error">Username exists try another!</Alert>
      }
      {values.msg===false && <Redirect to='/Register'/>}
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <ThemeProvider theme={theme} >
        <form className={classes.form} Validate onSubmit={handleSubmit}>
          <TextField
           variant="standard"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            value={values.uid}
            onChange={handleChange('uid')}
            autoComplete="username"
            autoFocus
           
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange('password')}
            value={values.password}
            
          />
          
             <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="c_password"
            label="Confirm Password"
            type="password"
            id="c_password"
            onChange={handleChange('c_password')}
            value={values.c_password}
            
            
          />
          <h2>{warning||''}</h2>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            
          >
            Sign Up
          </Button>
        
          <Grid container>
            
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        </ThemeProvider>
      </div>
      <Box mt={8}>
      
      </Box>
    </Container>
   
  );
}
