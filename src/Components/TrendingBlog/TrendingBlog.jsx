
import './TrendingBlog.css'
import { Link } from 'react-router-dom';

function TrendingBlog({blog}) {
    let image='';
    switch (blog.category){
        case "Travelling":
            image='Travelling.jpg'
            break;
        case "Cooking":
            image='cooking.jpg'
            break;
        case "Health":
            image='Health.jpg'
            break;
        case "Programming":
            image='programming.jpg'
            break;
        case "Workouts":
            image='workout.jpg'
            break;
        default:
            image="Banner.jpg"
            break;
    }
            
    return(
        <Link to={`/Blog/${blog.id}`}>
                <div className="card" style={{width: '18rem'}}>
                <img src={`/media/${image}`} className="card-img-top" alt="..."/>
                <div className="card-body">
                 <h5 class="card-title">{blog.title}</h5>
                 <p class="card-text text-muted">{blog.category}</p>
                 <p class="card-text">{blog.previewDescription}</p>                    
                </div>
                </div>
            </Link>

    )
}

export default TrendingBlog;