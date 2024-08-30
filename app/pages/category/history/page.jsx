"use client";

import { useState, useEffect } from "react";
import CategoryNewsList from "@/components/CategoryNewsList";

const CategoryPage = () => {
  const category = "history" // Extract 'category' from the query params
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    
    if (category) {
      console.log("Category:", category); // Log the category

      // Fetch news based on the selected category
      const fetchNewsByCategory = async () => {
        try {
          const response = await fetch(`/api/news/category/history`);
          if (!response.ok) throw new Error("Failed to fetch news");

          const data = await response.json();
          setNewsData(data);
        } catch (error) {
          console.error("Failed to fetch news:", error);
        }
      };

      fetchNewsByCategory();
    }
  }, [category]); // Run effect when 'category' changes

  return (
    <div>
      <h1 className="text-5xl font-serif text-center mt-8">
      History News
      </h1>
      <CategoryNewsList newsData={newsData} />
    </div>
  );
};

export default CategoryPage;
