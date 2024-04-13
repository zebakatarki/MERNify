import { Sidebar } from 'flowbite-react';
import React from 'react'; 
import {HiUser, HiArrowSmRight} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search); // Get the URL parameters from the current location
    const tabFromUrl = urlParams.get('tab'); // Get the value of the 'tab' parameter from the URL parameters
    console.log(tabFromUrl); //Log the value of the 'tab' parameter to the console  

    if(tabFromUrl){
      setTab(tabFromUrl);
    }

  },[location.search]);

  const handleSignOut = async () => {
    try{
      const res = await fetch('/api/user/signout',{
        method:'POST',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess());
      }
    }catch(error){
      console.log(error.message); 
    }
  }

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
          <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' as='div'>
            Profile
          </Sidebar.Item>
          </Link>

          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
            Sign Out
          </Sidebar.Item>  
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}