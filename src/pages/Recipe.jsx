import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getMealById } from "../api";
import { Preloader } from "../components/Preloader";

export function Recipe() {
    const [recipe, setRecipe] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getMealById(id).then(data => setRecipe(data.meals[0]))
    }, [id])
    const {strMealThumb, strMeal, strCategory, strArea, strInstructions, strYoutube} = recipe;

  return (
    <>
    {!recipe.idMeal ? (<Preloader/>) : (
        <div className="recipe">
            <img src={strMealThumb} alt={strMeal} />
            <h1>{strMeal}</h1>
            <h6>Category: {strCategory}</h6>
            {strArea? <h6>Area: {strArea}</h6>: null}
            <p>{strInstructions}</p>
            <table className="centered">
        <thead>
          <tr>
              <th>Ingredient</th>
              <th>Measure</th>
              
          </tr>
        </thead>

        <tbody>
          {
            Object.keys(recipe).map(key => {
                if (key.includes('Ingredient') && recipe[key]) {
                    return (
                        <tr key={key} >
                            <td>{recipe[key]}</td>
                            <td>
                                {
                                    recipe[
                                        `strMeasure${key.slice(13)}`
                                    ]
                                }
                            </td>
                        </tr>
                    )
                }
                return null
            })
          }
        </tbody>
      </table>
            {strYoutube?(<div className="row">
                <h5>Video recipe</h5>
                <iframe title={id} src={`https://www.youtube.com/embed/${strYoutube.slice(-11)}`} allowFullScreen/>
            </div> ) : null}
        </div>
    )}
    <button className='btn' onClick={() => navigate(-1)} >Go back</button>
    </>
  )
}
