import React from 'react'

{/* props acts as a js object we can destructure into searchterm and setSearchTerm to get its values 
  do not modify value of a prop or state in child component only muttate the set function AKA props are read only*/}

const Search = ({searchTerm , setSearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt = "search"/>
        <input
         type="text"
         placeholder="Search through thousands of movies"
         value={searchTerm}
         onChange = { (e) => setSearchTerm(e.target.value) } 
        />
        {/* use onChange to change value of searchTerm */}
      </div>
    </div>
  )
}

export default Search