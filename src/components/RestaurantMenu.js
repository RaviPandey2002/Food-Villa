import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const RestaurantMenu = ( ) =>{
    const reqURL = "https://www.swiggy.com/restaurants/";
    const { id } = useParams();
    useEffect(()=>{
        const handelFetch = async ()=>{
            const req = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=29.2182644&lng=79.5129767&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            
            const d = req.json();
            const data = await d;
            console.log(data);
        }

        handelFetch()
    },[])


    return (
        <div className="menuPage">
            <h2> {`${reqURL}+${id}`} </h2>
            
        </div>
    )
}

export default RestaurantMenu;