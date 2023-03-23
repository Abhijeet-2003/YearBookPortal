// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import LandingPage from "./pages/Landing Page/LandingPage";
import MyProfilePage from "./pages/MyProfileRight";
import FriendsProfilePage from "./pages/FriendsProfile"
import LeaderBoard from './pages/Leaderboard';
import Testimonials from "./pages/Testimonial/Testimonials";
import { useIsAuthenticated } from "@azure/msal-react";

function App({ msalInstance }) {

  const isAuthenticated = useIsAuthenticated();
  
  return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              {isAuthenticated ? <Homepage /> : <LandingPage />}
            </Route>
            <Route exact path="/myprofile">
              {isAuthenticated ? <MyProfilePage /> : <LandingPage />}
            </Route>
            <Route exact path="/testimonials">
              {isAuthenticated ? <Testimonials/> : <LandingPage />}
            </Route>
            <Route exact path="/leaderboard">
              {isAuthenticated ? <LeaderBoard/> : <LandingPage />}
            </Route>
            <Route exact path="/friendprofile">
              {isAuthenticated ? <FriendsProfilePage/> : <LandingPage />}
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;