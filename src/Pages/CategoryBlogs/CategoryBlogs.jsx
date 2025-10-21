import Banner from "../../Components/Banner/Banner";
import TrendingBlog from "../../Components/TrendingBlog/TrendingBlog";
import blogs from "../../Utils/MockData";
import  './CategoryBlogs.css';
import { useState,useEffect } from "react";
import { data, useParams } from "react-router-dom";

function CategoryBlogs(){

      const [currentCategory, setCurrentCategory] = useState('Programming')
      const {category}=useParams();
      useEffect(()=>{
        if(category){
            setCurrentCategory(category);
            fetch("http://localhost:3000/blog/Category/"+category)
            .then(data=>{
                return data.json()
            })
            .then(data=>{
                console.log('Data from server:', data);
            })
        }
      },[])
    return(
        <>   
             <Banner />
             

            <div className="trending-blogs-section">
                <h1>
                    {currentCategory}
                </h1>
                <div className="all-trending-blogs d-flex justify-content-between flex-wrap  row-gap-2">
                    { blogs.map(blog=>blog.category==currentCategory &&
                         <TrendingBlog blog={blog} />    
                    )}
                </div>
            </div>

        </>
    )
}

export default CategoryBlogs;