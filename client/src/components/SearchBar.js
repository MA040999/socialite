import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { search } from "../redux/posts/postActions";
function SearchBar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    if(searchTerm.trim()){
      dispatch(search(searchTerm))
    }
    else{
      history.push('/')
    }

  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      handleSearch()
    }
  }

  return (
    <div className="search-container">
      <input
        name="search"
        className="search-input"
        placeholder="Search..."
        autoComplete="off"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        onKeyPress={(e)=>handleKeyPress(e)}
      />
      <button className="search-icon">
        <BsSearch onClick={handleSearch} style={{ fontSize: "18px" }} />
      </button>
    </div>
    
  );
}

export default SearchBar;
