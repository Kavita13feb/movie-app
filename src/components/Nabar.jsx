import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';



import "../css/navbar.css"
import { FaHeart } from 'react-icons/fa';

export const Navbar = () => {


    const navigate =useNavigate()
  return (
    <div className='NavbarContainer'>
      <h3 onClick={()=>navigate("/")} >MovieApp</h3>
      <SearchBar  />
        <p onClick={()=>navigate("/fav")}> <FaHeart /></p>
    </div>
  );
};

