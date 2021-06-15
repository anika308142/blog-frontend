import React from 'react'
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles'
import Logout from "./pages/Logout";
import Story from "./pages/Story";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateStory from "./pages/Create-story";
import StorybyId from './pages/Story-by-id';
import EditStory from './pages/Edit-story'
const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 24,
      marginBottom: 20
    }
  },
  palette: {
    primary: {
      main: '#ffb366',
    },
    secondary: {
      main: '#fffff'
    }

  }
})

function App() {
  return (
    <div>
      <Router>
        <Route path="/Register" exact component={Register} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Logout" exact component={Logout} />
        <Route path="/Story" exact component={Story} />
        <Route path="/Create-story" exact component={CreateStory} />
        <Route path="/Edit-story" exact component={EditStory} />
        <Route path="/posts/:pid"><StorybyId /></Route>
        <Route path="/" exact component={Story} />
      </Router>
    </div>
  );
}
export default App;
