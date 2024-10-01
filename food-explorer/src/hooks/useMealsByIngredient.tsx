import { useState, useEffect } from 'react';

const useMealsByIngredient = (ingredient: string | null) => {
  const [ingredientMeals, setIngredientMeals] = useState<any[]>([]);
  const [ingredientMealLoading, setIngredientMealLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {

    if (!ingredient) return;

    const fetchIngredientMeals = async () => {
      setIngredientMealLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${import.meta.env.VITE_MEALDB_BYINGREDIENT}filter.php?i=${ingredient}`);
        const data = await response.json();
        
        // Check if meals exist in the response
        if (data.meals) {
          // Format the fetched data
          const formattedIngredientMeals = data.meals.map((meal: any) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            thumbnail: meal.strMealThumb,
          }));

          setIngredientMeals(formattedIngredientMeals);
        } else {
          setIngredientMeals([]);
        }
      } catch (err) {
        setError('Failed to fetch ingredient meals');
        setIngredientMeals([]);
      } finally {
        setIngredientMealLoading(false);
      }
    };

    fetchIngredientMeals();
  }, [ingredient]);

  return { ingredientMeals, ingredientMealLoading, error };
};

export default useMealsByIngredient;