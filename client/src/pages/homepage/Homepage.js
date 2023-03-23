import "./homepage.css";
import CamImg from "../../assets/homepage/camerabg.png";
import MegaphoneIcon from "../../assets/homepage/megaphoneIcon.svg";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { fetchGraphData } from "../../configurations/graph";
import { MIDContext } from "../../contexts/mId";


function Homepage() {
  const [datas, setDatas] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const { mID, setMID } = useContext(MIDContext);


  useEffect(() => {
    
    const request = {
      scopes: ['User.ReadBasic.All'],
      account: accounts[0]
    }
    if(graphData != null) {
      // console.log("Graph data is : ", graphData);
      return;
    }

    instance.acquireTokenSilent(request)
    .then((response) => {
      console.log(response.accessToken);
      const accessToken = response.accessToken;
      fetchGraphData("https://graph.microsoft.com/v1.0/me", accessToken)
      .then((res) => {
        setGraphData(res);
        // console.log("the graph data is: " + res);
        
        // const graduating == 
        setMID(res['id']);    // set the MID context
        const userData = {
          'full_name': res['givenName'],
          'program': res['jobTitle'],
          'mail': res['mail'],
          'rollno': res['surname'],
          'mId': res['id'],
          'department': res['surname'].substring(4, 6),
          // 'bio': '',
          // 'address': '',
          // 'phoneno': '0000000000',
          // 'profile_pic': ''
        };

        const url = process.env.REACT_APP_BASE_URL + 'api/userReg/';
        fetch("http://127.0.0.1:8000/api/userReg/",  {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userData),
        }).then(resp => console.log("Response recieved " + resp.status)).catch(e => {
          console.log(`error is ${e}`);
        });


      })
      .catch(error => console.log(error));
    })
    .catch((e) => {
        console.log(e);
    });


  }, [graphData, accounts, instance]);

  useEffect(() => {
    fetch("http://localhost:8000/api/announcements/", {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDatas(data);
        setIsPending(false);
        
      }).catch((e) => {
        console.log(e.data);
      });
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <img src={CamImg} alt="CamImg" className="camera-img" />
      <Link to="#">
        <div className="search">YEARBOOK 2022 &nbsp; &#128279;</div>
      </Link>
      <div className="announcement">
        <h2>Announcement</h2>
        <div className="para">
          {isPending && <div>Loading.....</div>}
          {datas &&
            datas.map((data) => (
              <div key={data['id']} className="databody">
                {data['id']}. {data['content']}
                {data['important'] ? <img src={MegaphoneIcon} alt="" className="megaphoneicon" /> : <></>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;