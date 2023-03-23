import sail from '../../assets/navbar/sail.png';
import yearbook from '../../assets/navbar/Links.png';
import userImg from '../../assets/navbar/userImg.jpg';
import menu from '../../assets/navbar/menu.png';
import {Link} from 'react-router-dom';
import "./Testimonials.css"
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../../components/navbar/Navbar";
import image1 from "../../assets/Testimonials/Group 574.png"
import image2 from "../../assets/Testimonials/Group 618.png"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Profile from "../../components/profileboxes/profilebox";
import data from "./TemplateData.json"
import { Pagination, Navigation } from "swiper";
function Testimonials()
{
    const [ Query,setQuery] = useState("");
    const [openMenu, setOpenMenu] = useState(false);
    console.log(data.filter(user=>user.title.toLowerCase().includes("gr")));
    return(
        <div className="testimonials">
          <Navbar/>
        <div className="images" >
     <div className="img-one"><img src={image1} alt=""/></div>
        <div className="img-two" ><img src={image1} alt=""/></div>
     <div className="img-three" > <img src={image1} alt=""/></div>
       <div className="img-four" > <img src={image2} alt=""/></div>
    </div>
    
    <div className="testi">
    <div className="img-three" > <img src={image1} alt=""/></div>
       
        <div className="text">
        <h1>A  lot of happy students......</h1>
        <p align="center">"Life will never be the same without you" You are probably the most<br/> perfect people guy with beautiful heart falls easily for anyone having a<br/> few common traits. </p>
    </div>
    <div className="img-three" > <img src={image1} alt=""/></div>
    </div>
    <div className="wrap">
        <div className="search-testi">
           <input type="text" className="searchTerm" placeholder="Search a friend..."
          onChange={(e) => setQuery(e.target.value)}
           />
           <button type="submit" className="searchButton">
             <i className="fa fa-search"></i>
          </button>
        </div>
        </div>
        <div className="swipe" >
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
       { data.filter(user=>user.title.toLowerCase().includes(Query)).map((user) =>(
        <SwiperSlide>
          <Profile
              key={user.id}
              name = {user.title}  
          />
          </SwiperSlide>
       ))}
          
        </Swiper>
        </div> 
        </div>
    );
}
export default Testimonials;