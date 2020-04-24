import React from 'react';

const CategoryPicker = () => {

    let categories = API.getCategories();
    console.log("In CategoryPicker: ", categories);

    return (
        <div class="dropdown-content" id="pickCategory">
            <label>Select a Topic</label>
            <select name="categories">
                {categories.map((item) => (
                    <option value="{item}">${item}</option>
                ))}
            </select>
        </div>
    )
}

export default CategoryPicker;
