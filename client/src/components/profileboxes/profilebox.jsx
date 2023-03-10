import react from "react";
import "./profilebox.css"
import Img from "../../assets/profilebox/profile1.png"


function Profile(props)
{
    return(
        <div className="card">
            <div className="img"><img src={Img} ></img> </div>
            <div className="heading"><h1>{props.name}</h1> </div>
            <div className="desc"><p align="center">Electronics & Communication<br/> Engineering, BTech 2018</p></div>
        </div>
    );
}

export default Profile;