import React, { useEffect } from 'react'
import './Profile.css'
import { UserAuth } from '../../store/firebaseContext'
import { useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ProfilePost from '../ProfilePost/ProfilePost'

const Profile = () => {

    const { user } = UserAuth()
    const [profile, setProfile] = useState([])
   

    useEffect(() => {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setProfile(doc.data())
          })
        })
    
      },[])

   console.log(profile)

  return (
    <div className='profile-parent-div'>
        <div>
            <h4>My Profile</h4>
        </div>
        <div className='profile-container-div'>
            <div className='profile-left'>
                <div className='profile-pic'>
                    <img  src='https://www.elpoderdelasideas.com/olx-el-sitio-de-compra-y-venta-online-por-designstudio/olx-avatar3/' alt="" />
                </div>
                <p className='profile__text'>{profile.username}</p>
                <p className='profile__text'>Phone: {profile.phone}</p>
                <p className='profile__text'>Email: {profile.email}</p>
            </div>
            <div className='profile-right'>
                <h4>My Ads</h4>
                <ProfilePost />
            </div>
        </div>
    </div>
  )
}

export default Profile