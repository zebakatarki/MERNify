import { Button, TextInput, Alert } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar'; //image circular package
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const {currentUser} = useSelector((state)=>state.user);
  const [imageFile, setImageFile] = useState(null); //when the element triggered
  const [imageFileUrl, setImageFileUrl] = useState(null); //when the element triggered it aaccepts the url of image
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null); //
  const [imageFileUploadError, setImageFileUploadError] = useState(null); //error handler for uploading image
  console.log(imageFileUploadingProgress,"......",imageFileUploadError);

  const filePickerRef = useRef(); //input of type='file' functionality on clicking the profile image

  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); //creates the url of image for local host 
    }
  };

  console.log(imageFile,"<<<<.......>>>>",imageFileUrl);
  useEffect(()=>{
    if(imageFile){
      uploadImage();
    }
  },[imageFile]); //whnevr changes happen in the image File the useEffect will come to play
  
  const uploadImage = async()=>{
    console.log("Uploading Image");
    //Code of image from firebase
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploadError(null);
    const storage = getStorage(app); 
    const fileName = new Date().getTime() + imageFile.name; //bcz the 2 people can hv same imageFile.name to make it unique we added date and time
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //progress is  10.123456
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error)=>{
        setImageFileUploadError('Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL);
        }
        )
      }
    )
  }

  return (
    <div className='text-black  max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>

        <input type='file' accept='image/=' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()}>

        {imageFileUploadingProgress && (
          <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}%`}
          strokeWidth={5}
          styles={{
            root:{
              width:'100%',
              height:'100%',
              position: 'absolute',
              top:0,
              left:0,
            },
            path:{
              stroke:`rgba(62,154,199, ${imageFileUploadingProgress / 100})`,
            },
          }}
          />
        )}

        <img src={imageFileUrl || currentUser.profilePicture} alt="user" 
        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`} />
        </div>

        {imageFileUploadError && <Alert color='failure'> {imageFileUploadError} </Alert> }
        
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />

        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />

        <TextInput type='password' id='password' placeholder='********' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <spam className="cursor-pointer">Delete Account</spam>
        <spam className="cursor-pointer">Sign Out</spam>
      </div>
    </div>
  );
  }