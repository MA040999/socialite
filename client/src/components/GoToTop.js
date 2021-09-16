import React from 'react'
import { IoIosArrowDropupCircle } from 'react-icons/io'

function GoToTop() {
    const handleGoToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <div className='go-to-top-container'>
            <button className='go-to-top-btn' onClick={handleGoToTop}>
                <IoIosArrowDropupCircle color='white' />
            </button>
        </div>
    )
}

export default GoToTop
