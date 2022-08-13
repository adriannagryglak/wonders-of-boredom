import { ActivitiesListStyled } from "./ActivitiesStyled"

export default function ActivitiesForm({filter, handleCategoryChange, handleTagChange}) {

    
    
    return <ActivitiesListStyled menuOpen={false}>
                <li>
                    <input onChange={handleCategoryChange} checked={filter.category === "outdoor"} value='outdoor' type="radio" name="category" id="isOutdoor"/>
                    <label htmlFor="isOutdoor">outdoor</label>
                </li>
                <li className="closed">
                    <input onChange={handleCategoryChange} checked={filter.category === "alone-only"} type="radio" name="category" value='alone-only' id="isSolo"/>
                    <label htmlFor="isSolo">solo adventure</label>
                </li>
                <li className="closed">
                    <input onChange={handleCategoryChange} checked={filter.category === ""} type="radio" name="category" value="" id="none"/>
                    <label htmlFor="none">none</label>
                </li>
            </ActivitiesListStyled>

//     </fieldset>
//     <fieldset>
//     <legend>search by tags:</legend>

//         <input onChange={handleTagChange} type="checkbox" name="autumn" id="autumn" checked={filter.tags.includes("autumn")}/>
//         <label htmlFor="autumn">autumn</label>

//         <input onChange={handleTagChange} type="checkbox" name="active" id="active" checked={filter.tags.includes("active")}/>
//         <label htmlFor="active">active</label>
//     </fieldset>
// </form> 

} 