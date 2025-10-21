import Banner from '../../Components/Banner/Banner';
import './DedicatedBlog.css'

import { useState,useEffect } from 'react';
import blogs from '../../Utils/MockData';
import { data, useParams } from 'react-router-dom';


function DedicatedBlog() {
    const [blogID, setBlogId] =useState(2);
    

    let blogToDisplay = blogs.filter(blog => blog.id==blogID)[0]
    const {id} =useParams()
    console.log(id)
    useEffect(()=>{
          if(id){
            setBlogId(id);
            
                fetch("http://localhost:3000/blog/GetBlog/"+id)
                .then(data=>{
                    return data.json();
                
                })
                .then(data=>{
                    console.log("data from the dedicated log:", data)
                })
            }
            },[])
       
    return(
        
        <>   
             <Banner />
            <h1>{blogToDisplay.title}</h1>
            <h6>{blogToDisplay.category}</h6>
            <p>{blogToDisplay.content}</p>
            
        </>

    )
}

export default DedicatedBlog;