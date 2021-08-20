import React from 'react'
import { BsSearch } from 'react-icons/bs'
function SearchBar() {
    return (
        <div className='search-container'>
            <input name='search' className='search-input' placeholder='Search...'/>
            <button  className='search-icon'>
                <BsSearch style={{fontSize: '18px'}} />
            </button>
            

        </div>
    )
}

export default SearchBar
