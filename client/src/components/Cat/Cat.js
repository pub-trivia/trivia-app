import React, { forwardRef, useEffect, useState } from "react"; 
import API from '../../utils/API';

const Cat = forwardRef((props, ref) => {
    const [categories, setCategories] = useState(
        []
    )

    const wrapperFunction = () => {
        API.getCategories()
        .then(results => {
        setCategories(
            results.data
        )})
    }

    useEffect(() => {
        wrapperFunction();
    } ,[])
    


    return (
    <div>
        <label>Select a Topic:</label>
        <div class="dropdown-content" id="pickCategory">
          <select name="categories" ref={ref}>
            {categories.map((item) => (
              <option value="{item}">${item}</option>
            ))}
          </select>
        </div>
    </div>
    )
})


export default Cat;