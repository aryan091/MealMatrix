import { useState, useEffect } from 'react';

// Define the types for the category data structure
interface Category {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}



// Custom hook to fetch categories
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_MEALDB_CATERORIES}`);
        const data = await response.json();

        if (data.categories) {
          // Format the fetched data to match the local structure
          const formattedCategories: Category[] = data.categories.map((category: any) => ({
            id: category.idCategory,
            name: category.strCategory,
            thumbnail: category.strCategoryThumb,
            description: category.strCategoryDescription,
          }));

          setCategories(formattedCategories);
        } 
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
