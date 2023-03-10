// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import LandingPage from "./pages/Landing Page/LandingPage";
import MyProfilePage from "./pages/MyProfileRight";
import FriendsProfilePage from "./pages/FriendsProfile"
import LeaderBoard from './pages/Leaderboard';
import Testimonial from "./pages/Testimonial/Testimonials"
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Homepage />
          </Route>
          <Route exact path="/myprofile">
            <MyProfilePage />
          </Route>
          <Route exact path="/testimonial">
            <Testimonial/>
          </Route>
          <Route exact path="/leaderboard">
            <LeaderBoard/>
          </Route>
          <Route exact path="/friendprofile">
            <FriendsProfilePage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;