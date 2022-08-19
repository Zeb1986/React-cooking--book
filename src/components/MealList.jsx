import { useNavigate } from "react-router-dom";
import { Meal } from "./Meal"

export function MealList({meals}) {
  const navigate = useNavigate();
  return (
    <>
    <button className='btn' onClick={() => navigate(-1)} >Go back</button>
    <div className="list">
        {meals.map(meal => {
           return <Meal key={meal.idMeal} {...meal}/>
        })}
    </div>
    </>   
  )
}
