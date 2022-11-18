import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { UserAuth } from '../../store/firebaseContext';

import './View.css';
function View() {

  const { productDetails } = UserAuth()
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    const q = query(collection(db, "users"), where("id", "==", productDetails.userId));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserInfo(doc.data())
      })
    })

  }, [])
  console.log(userInfo)
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productDetails.price} </p>
          <span>{productDetails.name}</span>
          <p>{productDetails.category}</p>
          <span>{productDetails.createdOn}</span>
  </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userInfo.username}</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
