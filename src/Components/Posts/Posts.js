import React, { useState } from 'react';
import { useContext, useEffect } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../Store/PostContext';
import { useNavigate } from "react-router-dom"

function Posts() {

  const {db} = useContext(FirebaseContext)
  const [products,setProducts] = useState([])
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()

  useEffect(()=>{
    
      // if(!user){
      //     navigate("/login")
      // }
          getDocs(collection(db,"products")).then(snapshot=>{
          const allPost = snapshot.docs.map(obj=>{
                return{
                    ...obj.data(),
                    id:obj.id
                }
            })
            setProducts(allPost)
        })
      
      
  },[db])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Fresh recommendations</span>
          <span></span>
        </div>
        <div className="cards">
         
        {
          products.map(product=>{
              return(
                
                  <div key={product.id}
              className="card" onClick={()=>{
                setPostDetails(product)
                navigate("/view")
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">₹ {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
            
              )
          })
        }

        </div>
      </div>
    </div>
  );
}

export default Posts;
