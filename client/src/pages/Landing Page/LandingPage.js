import "./landing.css";
import SailLogo from "../../assets/landingpage/SailLogo.svg";
import axios from 'axios';
import { useMsal } from "@azure/msal-react";

const LandingPage = () => {

  const { instance } = useMsal();

  const handleSignIn = async (e) => {
    // e.preventDefault();
    // const res = await axios.post("http://127.0.0.1:8000/auth/");
    // console.log(res);
    instance.loginRedirect({
      scopes: ['User.ReadBasic.All']
    });
  }
  return (
    <div className="landingpage">
      <img src={SailLogo} alt="" className="saillogo-img" />
      <div className="landing-intro">
        <h1 className="landing-heading">YEAR BOOK</h1>
        <hr className="landing-border" />
        <h4>#LET'S WRITE MEMORIES</h4>
        {/* <Link to="/home"> */}
          <button className="loginbtn" onClick={handleSignIn}>Login</button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default LandingPage;
