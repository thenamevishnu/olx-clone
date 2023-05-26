import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import { authContext, FirebaseContext } from '../../Store/FirebaseContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const [name,setName] = useState("")
  const [category,setCatergory] = useState("")
  const [price,setPrice] = useState("")
  const [image,setImage] = useState(null)
  const {user} = useContext(authContext)
  const {db,storage} = useContext(FirebaseContext)
  const navigate = useNavigate()
  const newDate = new Date().toDateString()

  // useEffect(()=>{
  //     if(!user){
  //         navigate("/login")
  //     }
  // },[user,navigate])

  const handleSubmit = () => {
   
      const storageRef = ref(storage,"Images/"+image.name)
      uploadBytes(storageRef,image).then(({ref})=>{
        getDownloadURL(ref).then(url=>{
          const obj = {
            name,category,price,url,user_id:user.uid,createdAt:newDate
          }
            addDoc(collection(db,"products"),obj).then(()=>navigate("/"))
        })
      })
  }

  return (
    <Fragment>
     
        <div className="centerDiv">
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              placeholder="John"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              placeholder="Category"
              value={category}
              onChange={(e)=>setCatergory(e.target.value)}
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input className="input" type="number" id="price" name="price" placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <br />
          <br />
          { image && <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : null}></img> }
          
            <br />
            <input type="file" name='image' onChange={(e)=>{  
                setImage(e.target.files[0])
            }}/>
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>Upload and Submit</button>
          
        </div>
      
    </Fragment>
  );
};

export default Create;
