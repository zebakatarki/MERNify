import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPost from '../components/DashPost';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComponent from '../components/DashboardComponent';

export default function Dashboard() {
  //The useLocation hook is used to access the current URL location in a React component. 
  //It returns a Location object that represents the current URL. This object contains properties like pathname, 
  //search, hash, etc., which provide information about the current URL.
  
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search); // Get the URL parameters from the current location
    const tabFromUrl = urlParams.get('tab'); // Get the value of the 'tab' parameter from the URL parameters
    console.log(tabFromUrl); //Log the value of the 'tab' parameter to the console  

    if(tabFromUrl){
      setTab(tabFromUrl);
    }

  },[location.search]); //it only runs this function again when the location.search changes. 

  return ( 
    <div className='min-h-screen flex flex-col md:flex-row dark:bg-black'>
      <div className='md:w-56 dark:bg-black'>
        {/* Slidebar */}
        <DashSidebar/>
    </div>
    {/* Profile .... */}
    {tab === 'profile' && <DashProfile/>}
    {/* Post */}
    {tab === 'posts' && <DashPost/>}
    {/* Users */}
    {tab === 'users' && <DashUsers/>}
    {/* Comments */}
    {tab === 'comments' && <DashComments/>}
    {/* dashboard Component */}
    {tab === 'dash' && <DashboardComponent/>}
  </div>
  );
}
