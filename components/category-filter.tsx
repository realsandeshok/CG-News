"use client"

import { useState } from "react"

// const newsCategories = [
//   "news/Health",
//   "news/Sports",
//   "news/Business",
//   "news/Arts_and_Entertainment",
//   "news/Politics",
//   "news/Environment",
//   "news/Technology",
//   "news/Science",
// ];


const categories = [
  { id: "", name: "All" },
  { id: "Health", name: "Health" },
  { id: "Sports", name: "Sports" },
  { id: "Business", name: "Business" },
  { id: "Arts_and_Entertainment", name: "Arts & Entertainment"},
  { id: "Politics", name: "Politics"},
  // { id: "Environment", name: "Environment" }, // No news of Chhattisgarh
  // { id: "Technology", name: "Technology" }, // No news of Chhattisgarh
  // { id: "Science", name: "Science" }, // No news of Chhattisgarh
]

export default function CategoryFilter({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState("")

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    onCategoryChange(categoryId)
  }

  return (
    <div className="overflow-x-auto pb-2 relative z-20 ">
      <div className="flex gap-2 my-6 min-w-max px-1 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-1 rounded-full text-sm transition-colors whitespace-nowrap ${
              activeCategory === category.id
                ? "bg-[#ff6b5b] text-white"
                : "bg-transparent border border-gray-700 text-foreground hover:border-[#ff6b5b]"
            }`}
          > 
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

