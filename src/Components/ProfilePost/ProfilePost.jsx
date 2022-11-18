import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { db } from '../../firebase/config'
import { UserAuth } from '../../store/firebaseContext'

import './ProfilePost.css'

const ProfilePost = () => {

    
    const { user } = UserAuth()
    const [myAds, setMyAds] = useState([])

    const deletePost = async (post) => {
      const response = window.confirm('Are you sure')
      response &&
      await deleteDoc(doc(db, "products", post));
    }

    useEffect(() => {
        const colRef = collection(db, 'products')
        const q = query(colRef, where("userId", "==", user.uid))
        onSnapshot(q, (snapshot) => {
        let arr = []
        snapshot.docs.forEach(doc => {
        arr.push({ ...doc.data(), id: doc.id })
        })
        setMyAds(arr)
        })
        
    
      },[])
      console.log(myAds)
  return (
    <div>
        <div className="cards">
          {myAds.map((myAd)=> {
          return <div
            className="card"
          >
            <div className="favorite">
              <AiOutlineDelete onClick={() => deletePost(myAd.id)}/>
            </div>
            <div className="image">
              <img src={myAd.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {myAd.price}</p>
              <span className="kilometer">{myAd.category}</span>
              <p className="name">{myAd.name}</p>
            </div>
            <div className="date">
              <span>{myAd.createdOn}</span>
            </div>
          </div>})}
       </div>
    </div>
  )
}

export default ProfilePost