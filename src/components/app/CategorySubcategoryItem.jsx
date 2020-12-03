import React, { useState } from 'react';
import { useEffect } from 'react';
import Cookie from 'js-cookie'



const CategorySubcategoryItem = (props) => {
    
	const [text, setText] = useState([
		props.data.name
    ])
    const [originalText, setOriginalText] = useState([
		props.data.name
    ])

  
return (
    <option
        value={props.data.slug}
        selected={
            props.subcategory ? props.subcategory === props.data.slug ? true : false : props.category === props.data.slug ? true : false
        }>
        {text[0]}
    </option>
)
}

export default CategorySubcategoryItem