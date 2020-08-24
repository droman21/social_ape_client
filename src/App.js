import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Site Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

//Components
import Navbar from './components/NavBar';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7b1fa2',
    },
    secondary: {
      main: '#ef6c00',
    }
  },
  typography: {
    useNextVariants: true,
  },
});


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
        <Router>
        <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}/>
              <Route exact path="/login" component={login}/>
              <Route exact path="/signup" component={signup}/>
            </Switch>
          </div>
        </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
