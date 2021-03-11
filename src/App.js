import './App.css';
import Main from "./components/main"
import Buy from "./components/buy"
import { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import RouterCreator from './components/router';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB9iZ88x4qEft8eBEyJMtOiB2WUoV7V-ho",
  authDomain: "travel-agency-example-react.firebaseapp.com",
  projectId: "travel-agency-example-react",
  storageBucket: "travel-agency-example-react.appspot.com",
  messagingSenderId: "774849804156",
  appId: "1:774849804156:web:4ffa78d1bc93a5addf96f9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class App extends Component {
  constructor(props){
    super(props);

    this.state = {location:[]};
  }
  


  componentDidMount(){
    //* Database loads into state here
    const location = [];
    
    db.collection("location").get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        location.push(doc.data());
      });
      this.setState({location: location});
    });
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Link to="/" className="HeaderLink">
          <div className="Header">
            <span className="Title">Zaklep.pl</span>
          </div>
        </Link>
        <Switch>
          <Route exact path="/">
            <div className="Main">
              <Main loc={this.state}/>
            </div>
          </Route>
          <Route path="/buy" key="Buy Route" component={Buy}>

          </Route>
          <RouterCreator loc={this.state}></RouterCreator>
        </Switch>
        <div className="Footer">
          <span className="Copyright">Michał Czyż & Dawid Głąb &copy; { new Date().getFullYear() }</span>
          <span className="Copyright">Website published on GPLv3 License</span>
        </div>
      </div>
      </Router>
    );
  }
  
}

export default App;
