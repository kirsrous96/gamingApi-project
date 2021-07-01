import React, { useEffect } from "react";
import './App.css';
import Banner from './Components/Banner';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { auth } from "./firebase";
import Header from "./Components/Header";
import Account from "./Components/Account";
import Popular from "./Components/Popular";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Chats from "./Components/Chats";
import Admin from "./Components/Admin";
import { useRecoilState } from "recoil";
import { userState } from "./Atoms/userState";

function App() {
  const [user,setUser] = useRecoilState(userState);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
          setUser({ 
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
            })
      } else {
        setUser(null);
      }
    });
  }, []);


  return (
    <div className="App">
      <Router>
        <div>
           <Header />
           <Switch>
             <div className="app__body">
            <Route path="/account">
                <Account />
            </Route>
            <Route path="/popular">
              <Popular />
            </Route>
            <Route path="/chat">
                <Chats />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route exact path="/administrator">
                <Admin />
            </Route>
            <Route exact path="/">
              <Banner />
              <Home />
            </Route>
            </div>
            </Switch>
        </div>
        </Router>
    </div>
  );
}

export default App;
