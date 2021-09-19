import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  changeSearchStatus,
  getPosts,
  removePosts,
  resetPage,
  search,
} from "../redux/posts/postActions";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    history.push("/");
    if (searchTerm.trim()) {
      dispatch(search(searchTerm));
      dispatch(changeSearchStatus(true));
      dispatch(resetPage());
    } else {
      dispatch(getPosts(1));
    }
  };

  const handleCancel = () => {
    setSearchTerm("");
    dispatch(changeSearchStatus(false));
    dispatch(removePosts());
    dispatch(getPosts(1));
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        name="search"
        className="search-input"
        placeholder="Search..."
        autoComplete="off"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <button className={`search-icon ${searchTerm ? "cancel-btn" : ""}`}>
        {searchTerm ? (
          <MdCancel onClick={handleCancel} style={{ fontSize: "18px" }} />
        ) : (
          <BsSearch onClick={handleSearch} style={{ fontSize: "18px" }} />
        )}
      </button>
    </div>
  );
}

export default SearchBar;
