import React from 'react'

const ServerIcon = ({image}) => {

    return (
        <>
        <img src={image} alt="img" className="h-12 cursor-pointer rounded-full transition-all duration-100 ease-in-out hover:rounded-2xl"/>
        </>
    )
}

export default ServerIcon
