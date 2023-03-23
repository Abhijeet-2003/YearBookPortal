import  profile_photo from '../../assets/myprofile/profile_photo.png';
import  instagram from '../../assets/myprofile/Instagram.png';
import  linkdin from '../../assets/myprofile/Linkdin.png';
import  profile_icon from '../../assets/myprofile/profile_icon.png';
import userData from '../../database/profile.json'
import { useState, useEffect, useContext } from 'react';
import { MIDContext } from '../../contexts/mId';

function Myself(){
    const[pop, setpop] = useState(0);
    const { mID } = useContext(MIDContext);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8000/api/profile/${mID}/`,{
            method: "GET",
        }).then(res => res.json())
        .then(data => {
            setProfile(data);
            console.log(data);
        })
        .catch(error => console.log("the error is: ", error));
    }, [mID]);

    useEffect(()=>{
        if(pop){
            document.querySelector('.myprofilebody').style.filter="blur(8px)"
            document.querySelector('.boxpp').style.visibility = "visible"
            setpop(0);
        }
    }, [pop])
    return(
        <div className='main'>    
            <div className='Logo_myself'>
                <img className="profile" alt="profile" src={profile_photo} />
                <img className="bioLogo" alt="bioLogo" src={profile_icon} onClick={()=> setpop(1) }/>
            </div>
            <div className='name'>{profile['full_name']}</div>
            <div className='info'>{profile['department']}, {profile['program']}, {profile['rollno']}</div>
            <div className='logos'>
                <a href={userData.profile[0].insta_handle}>
                    <img className="linkdin" alt="linkdin" src={linkdin} />
                </a>
                <a href={userData.profile[0].insta_handle}>
                    <img className="instagram" alt="instagram" src={instagram} />
                </a>
            </div>
            <div className='bio'>
                {profile['bio']}
            </div>
        </div>
    )
}

export default Myself