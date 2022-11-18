import { collection,onSnapshot,} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Heart from '../../assets/Heart';
import { db } from '../../firebase/config';
import { UserAuth } from '../../store/firebaseContext';

import './Post.css';

function Posts() {

  const [products, setProducts] = useState([]);
  const { setProductDetails } = UserAuth()
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      setProducts(documents)
    })

  }, [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {products.map((product)=> {
          return <div
            className="card"
            onClick={() => {
            setProductDetails(product)
            navigate('/view')}}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdOn}</span>
            </div>
          </div>})}
        </div>
      </div>     
    </div>
  );
}

export default Posts;
