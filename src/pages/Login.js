import React from 'react';
import axios from 'axios';
import {  useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Cookies from 'universal-cookie';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBarCustom from './AppBarCustom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Story from "./Story";
import { Route, BrowserRouter as Router } from "react-router-dom";
const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 24,
      marginBottom: 20
    }
  },
  palette: {
    primary: {
      main: '#0099cc',
    },
    secondary: {
      main: '#000000'
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function Login() {
  const classes = useStyles();
  const [created, setCreated] = React.useState(false);
  const [values, setValues] = useState({
    uid: '',
    password: '',
    msg: false,
    message: '',
    loggedIn: false
  });
  const [warning, setWarning] = useState(null);
  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    const { uid, password } = values;
    const user = { uid, password };
    axios.post('http://localhost:3001/users/login', user).then(res => {
      console.log('reading header');
      console.log(res.headers['authorization']);
      if (res.status === 200) {
        setValues({ msg: true, message: 'success', loggedIn: true })
        localStorage.setItem('loggedIn', true);
        localStorage.getItem('loggedIn');
        setCreated(true);
        localStorage.setItem('uid', values.uid);
        localStorage.setItem('token', res.headers['authorization']);
        cookies.set('Authorization', res.headers['authorization'], { path: '/' });
      }
    }).catch(error => {
      setValues({ msg: false, message: 'failed', loggedIn: false })
      localStorage.setItem('token', 'null');
    })
  }
  return (
    <div>
      <AppBarCustom />
      {created === true &&
        <div>
          <div style={{ color: '#00b300', fontSize: '30px', fontWeight: 'bolder', fontFamily: 'serif' }}><p >Log in Successfull!</p></div>
          <div> <Redirect to='/Story' /></div>
        </div>}
      {created === false && <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {values.message === 'failed' && <Alert severity="error">Password incorrect!</Alert>
          }
          <Typography component="h1" variant="h5">
            Sign In
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
                name="username"

                autoFocus
                value={values.uid}
                onChange={handleChange('uid')}
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
                value={values.password}
                onChange={handleChange('password')}
              />
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
                Sign In
          </Button>
              <Grid container>
                <Grid item>
                  <Link href='/Register' variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </ThemeProvider>
        </div>
        <Box mt={8}>
        </Box>
        <Router>
          <Route path="/Story" exact component={Story} />
        </Router>
      </Container>}
    </div>
  );
}
