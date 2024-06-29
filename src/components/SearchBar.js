import React, { useState } from 'react'

const SearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="searchBox">
        <input 
            className="searchInput"
            type="text"
            placeholder="Search"
            value={search}
            onChange={ (e)=> { setSearch(e.target.value) }}
        ></input>
        <button onSubmit={(e)=> {e.preventDefault}}>
          here
        </button>
    </div>
  )
}

export default SearchBar