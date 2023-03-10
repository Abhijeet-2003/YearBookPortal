import React from 'react'
import Profile from '../profileboxes/profilebox';
import "./search.css"
import Navbar from '../navbar/Navbar';
function SearchStudent() {
  return (
  
    <div className='main-content'>
    <Navbar></Navbar>
   {/* <div className='head-content'><input type="text" placeholder='Search a friend'></input></div> */}
   {/* <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?"/>
   </div> */}
    <div className='bg-effect'>
   <div className='head'><input className='search' type='text' placeholder='Search a Friend'></input></div>
    <div className="scroll">
    
    <div className='container'>
   
     <div className='box'>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     </div>
     <div className='box'>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     </div>
     <div className='box'>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     </div>
     <div className='box'>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     </div>
     <div className='box'>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     </div>
     <div className='box'>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     </div>
     {/* <div className='box'>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     <Profile></Profile>
     </div> */}
     </div>
  </div>
  </div>
  </div>
  );
}

export default SearchStudent;