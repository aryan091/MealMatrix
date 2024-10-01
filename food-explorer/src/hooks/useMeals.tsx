// useMeals.tsx
import { useState, useEffect } from 'react';

interface Meal {
  id: string;
  name: string;
  thumbnail: string;
}

export const useMeals = (category: string) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) {
      setMeals([]);
      return;
    }

    const fetchMeals = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();

        if (data.meals) {
          const formattedMeals: Meal[] = data.meals.slice(0, 5).map((meal: any) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            thumbnail: meal.strMealThumb,
          }));

          setMeals(formattedMeals); 
        } else {
          setError('No meals found.');
          setMeals([]);
        }
      } catch (err) {
        setError('Failed to fetch meals.');
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [category]);

  return { meals, loading, error };
};
