import React from "react";
import { IoLogoYoutube } from "react-icons/io5"; // YouTube icon
import { MdOutlineMenuBook } from "react-icons/md"; // Recipe icon
import { IoMdClose } from "react-icons/io";

interface MealDetails {
  name: string;
  category: string;
  instructions: string;
  ingredients: { name: string; measure: string }[];
  tags: string[];
  thumbnail: string;
  youtube: string;
  source: string;
  area: string;
}

interface DetailsSidebarProps {
  meal: MealDetails | null; // Allow meal to be null
  setShowSidebar: (showSidebar: boolean) => void;
}


const DetailsSidebar: React.FC<DetailsSidebarProps> = ({ meal , setShowSidebar}) => {
  if (!meal) return null;

  const instructionParagraphs = meal.instructions.split(/\r?\n/);

  const tagColors = [
    "bg-purple-200 text-purple-800",
    "bg-yellow-200 text-yellow-800",
    "bg-red-200 text-red-800",
    "bg-green-200 text-green-800",
    "bg-blue-200 text-blue-800",
    "bg-pink-200 text-pink-800",
  ];

  return (
    <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-4 overflow-y-auto z-30">

<div className="flex items-center justify-between ">
  {/* Meal name */}
  <h2 className="text-2xl font-bold mb-4">{meal.name}</h2>
<IoMdClose size={20} className="cursor-pointer mb-4" onClick={() => setShowSidebar(false)} />

</div>
      

      {/* Thumbnail image */}
      <img
        src={meal.thumbnail}
        alt={meal.name}
        className="rounded-lg mb-4 w-full h-48 object-cover"
      />

      {/* Tags */}
      <div className="flex flex-wrap mb-4">
        {meal.tags.map((tag, index) => (
          <span
            key={index}
            className={`${
              tagColors[index % tagColors.length]
            } px-2 py-1 rounded-full text-sm mr-2 mb-2 font-semibold`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Category and Area */}
      <div className="grid grid-cols-2 gap-x-64 mb-4">
        <p className="font-bold text-gray-600">Category</p>
        <p className="text-gray-800">{meal.category}</p>
        <p className="font-bold text-gray-600">Area</p>
        <p className="text-gray-800">{meal.area}</p>
      </div>

      {/* YouTube and Recipe Links */}
      <div className="flex items-center mb-4 gap-4">
        <a
          href={meal.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500"
        >
          <IoLogoYoutube size={24} />
        </a>
        <a
          href={meal.source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          <MdOutlineMenuBook size={24} />
        </a>
      </div>

      {/* Ingredients */}
      <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc list-inside mb-4">
        {meal.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.measure} {ingredient.name}
          </li>
        ))}
      </ul>

      {/* Instructions */}
<h3 className="text-xl font-semibold mb-2">Instructions</h3>
<div className="border rounded-lg p-4 bg-gray-50 shadow-sm mb-4">
  <ul className="list-none space-y-4 ">
    {instructionParagraphs.map((para, index) => (
      <li key={index} className="text-justify">{para}</li> 
    ))}
  </ul>
</div>

    </div>
  );
};

export default DetailsSidebar;
