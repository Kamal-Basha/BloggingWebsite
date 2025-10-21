import React from "react";

import './NewPost.css'
import { Form } from "react-router-dom";
import { useState } from "react";


function NewPost()  {
    const [postData,setPostData]=useState({
        userID:parseInt(sessionStorage.getItem('UserID')),
        category: "General",
        title: "",
        content: "",
    });

    function handleInput(e){
        const{name, value} = e.target;
        setPostData((prev)=>({
            ...prev,
            [name]: value,
        }));
    }


    function handleSubmit(){
        fetch('http://localhost:3000/blog/newBLog',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
        })
    }
   return(
    <>
      <form onSubmit={handleSubmit}>
        <div className="fromcontainer p-3 m-3">
           <div className="mb-3">
              <h1>category</h1>
                <select className="form-select" name="category" value={postData.category} onChange={handleInput}>
                        
                        <option >General</option>
                        <option >Fitness</option>
                        <option >Travel</option>
                        <option >Finance</option>
                        <option >Programming</option>

                    </select>
            </div>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                    <input type="text" name="title" className="form-control"  placeholder="Enter title"   value={postData.title} onChange={handleInput}  /> 
                   
                   
                    </div>
                
                    <div className="mt-3">
                    <label className="form-label">Content</label>
                    <textarea rows='5' name="content"  className="form-control" placeholder="write your thoughts..."   value={postData.content} onChange={handleInput}></textarea>
                    
                    </div>
                    
                        <button type="button" className="btn btn-primary w-100 mt-1" onClick={handleSubmit}> Post</button>
    
            </div>   
         </form>     
    </>
   )
}

export default NewPost;