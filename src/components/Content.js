import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

const Content = () => {
  const [listItems, setListItems] = useState(null);
  const [search, setSearch] = useState("");
  const [ dummyData, setDummyData] = useState(null);

  useEffect( ()=>{
    
      if( !listItems ) handleFetch();
      if( dummyData === null ) setDummyData(listItems);
      if(search != "") 
        {
          const filteredList = listItems.filter( (item)=>{
            if(item.name.toLowerCase().includes( search.toLowerCase()) ) return item;
          } )
          setDummyData(filteredList);  
        }
      else setDummyData(listItems);

  },
  [search,listItems]
)

const handleFetch = async ()=>{
  const req = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
  const data = await req.json();
  const obj = data?.data?.cards[2].data;
  console.log(obj);
  const result = Object.values(obj);


}

  return (
    <>
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <button
          onSubmit={(e) => {
            e.preventDefault;
          }}
        >
          here
        </button>
      </div>

      <div className="content">
        { dummyData != null ? dummyData.map((item) => {
          return (
            <RestaurantCard
            key={item.id}
            imgId={item.cloudinaryImageId}
            name={item.name}
            avgRating={item.avgRating}
            />
          );
        })  : <p> The List is empty</p>
          
                
        }
      </div>
    </>
  );
};

export default Content;
