import { useState, useEffect, useContext } from 'react';
import { MIDContext } from '../../contexts/mId';
import axios from 'axios';

function Popup(){
    const[pop, setpop] = useState(1);
    // const[mailId, setmailId] = useState('');
    const[phoneNum, setphoneNum] = useState('');
    const[userAddress, setuserAddress] = useState('');
    const[userbio, setuserbio] = useState('');
    const [file, setFile] = useState(null);
    const { mID } = useContext(MIDContext);

    useEffect(()=>{
        if(!pop){
            document.querySelector('.myprofilebody').style.filter="blur(0px)"
            document.querySelector('.boxpp').style.visibility = "hidden"
            setpop(1);
        }
    }, [pop])

    async function submit_changes(e){
        e.preventDefault();

        // const formData = new FormData();
        // formData.append('profile_pic', file);
        // await axios.put(`http://localhost:8000/api/profile/${mID}/`, formData, {
        //     headers: {'Content-Type': 'multipart/form-data'},
        // })
        // .then(resp => console.log(resp))
        // .catch(e => console.log(`error1 is ${e}`));

        await axios.put(`http://localhost:8000/api/profile/${mID}/`, {
            address: userAddress,
            bio: userbio,
            phoneno: phoneNum,
        })
        .then(resp => console.log(resp))
        .catch(e => console.log(`error2 is ${e}`));
        // setpop(0);
    }

    return(
        <div className='boxpp'>
            <form >
            <div className="navpp">
                <div className='headpp'>Edit Profile</div>
                <button className='crosspp' type='button' onClick={()=>setpop(0)}>X</button>
            </div>
            <div className='picpp'>
                <div className='picHead'>Upload new profile pic:</div>
                <div className='picture'>
                    <input type="file" id="myFile" name="Choose file" onChange={(event)=>setphoneNum(event.target.files[0])} />
                </div>
            </div>
            {/* <div className='mailpp'>
                <div className='mailHead'>Personal Mail id: </div>
                <input className='mailInput' placeholder='enter your mail id' type="email" onChange={(event)=>setmailId(event.target.value)}></input>
            </div> */}
            <div className='phonepp'>
                <div className='phoneHead'>Phone Number: </div>
                <input className='phoneInput' placeholder='enter your phone number' onChange={(event)=>setphoneNum(event.target.value)}></input>
            </div>
            <div className='addresspp'>
                <div className='addressHead'>Address: </div>
                <input className='addressInput' placeholder='enter your address' onChange={(event)=>setuserAddress(event.target.value)}></input>
            </div>
            <div className='biopp'>
                <div className='bioHead'>Bio: </div>
                <textarea className='bioInput' placeholder='enter your bio' onChange={(event)=>setuserbio(event.target.value)}></textarea>
            </div>
            <button className="submitpp" type="submit" onClick={submit_changes}>
                <div className="save_changespp">
                    Save Changes
                </div>
            </button>
        </form>
        </div>
    )
}
export default Popup;