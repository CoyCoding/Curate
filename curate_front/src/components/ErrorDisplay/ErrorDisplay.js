import React, { useState } from 'react';


function ErrorDisplay(props){
  console.log(props)
  return props.errors.map((error) => {
    return <p style={{color: "red", margin: '0'}} >{error}</p>
  })

}

export default ErrorDisplay;
