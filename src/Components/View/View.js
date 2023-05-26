import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { collection, getDocs, query, where } from 'firebase/firestore';

function View() {

  const [userDetails,setUserDetails] = useState(null)
  const {postDetails} = useContext(PostContext)
  const {db} = useContext(FirebaseContext)

  useEffect(()=>{
        // if(!user){
        //     navigate("/login")
        // }
            const userQuery = query(collection(db,"users"),where("id","==",postDetails.user_id))
            getDocs(userQuery).then(QuerySnapshot=>{
                QuerySnapshot.forEach(doc => {
                    setUserDetails(doc.data())
                });
            })
  },[db,postDetails.user_id])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt={postDetails.name}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>₹ {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.profileName}</p>
          <p>{userDetails.number}</p>
        </div> }
      </div>
    </div>
  );
}
export default View;
