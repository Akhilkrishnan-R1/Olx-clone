import React, { Fragment } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { v4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { UserAuth } from '../../store/firebaseContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const date = new Date()
  const navigate = useNavigate()
  const { user } = UserAuth();
  const uuidData = v4().toString()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(image == null) return;
    const imageRef = ref(storage, `images/${image.name + v4()}`)
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef, image).then((url) => {
        setDoc(doc(db, 'products', uuidData),{
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdOn: date.toDateString()
      })
      })
    })
    navigate('/')
  }
  return (
    <Fragment>
      <Header />
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image && URL.createObjectURL(image)}></img>
          <form>
            <br />
            <input onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          </form>
        </div>
    </Fragment>
  );
};

export default Create;
