import { useState, useEffect } from 'react';

interface MealDetails {
  name: string;
  category: string;
  instructions: string;
  ingredients: { name: string; measure: string }[]; // Update the ingredients type
  tags: string[];
}

const useMealDetails = (mealId: string | null) => {
  const [mealDetails, setMealDetails] = useState<MealDetails | null>(null);
  const [mealLoading, setMealLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!mealId) return;

    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];
          const ingredients = Object.keys(meal)
            .filter((key) => key.startsWith('strIngredient') && meal[key])
            .map((key, index) => ({
              name: meal[key],
              measure: meal[`strMeasure${index + 1}`] || '', // Get the corresponding measurement
            }));

          const formattedMeal = {
            name: meal.strMeal,
            category: meal.strCategory,
            instructions: meal.strInstructions,
            ingredients,
            tags: meal.strTags ? meal.strTags.split(',') : [],
            thumbnail: meal.strMealThumb,
            youtube: meal.strYoutube,
            source: meal.strSource,
            area:meal.strArea
          };

          setMealDetails(formattedMeal);
        } else {
          throw new Error('Meal not found');
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setMealLoading(false);
      }
    };

    fetchMealDetails();
  }, [mealId]);

  return { mealDetails, mealLoading, errorMessage };
};

export default useMealDetails;
