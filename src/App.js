import React, { useState } from "react";

export default function RecipeApp() {
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");

  const searchMeals = async () => {
    if (!ingredient) return;
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();
      if (data.meals) {
        setMeals(data.meals);
        setError("");
      } else {
        setMeals([]);
        setError("No meals found. Try another ingredient.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🍲 Recipe Ideas for Taylor</h1>
      <input
        type="text"
        placeholder="Enter an ingredient (e.g. chicken)"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />
      <button onClick={searchMeals}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {meals.map((meal) => (
          <div key={meal.idMeal} style={{ margin: "10px" }}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{ width: "200px", borderRadius: "10px" }}
            />
            <p>{meal.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
