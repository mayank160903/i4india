"use client";

import { useState, useEffect } from "react";
import CategoryNewsList from "@/components/CategoryNewsList";

const CategoryPage = () => {
  const category = "education" // Extract 'category' from the query params
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    
    if (category) {

      // Fetch news based on the selected category
      const fetchNewsByCategory = async () => {
        try {
          const response = await fetch(`/api/news/category/education`);
          if (!response.ok) throw new Error("Failed to fetch news");

          const data = await response.json();
          setNewsData(data);
          console.log("Fetched Data: ", data); // Log the fetched data
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
      Education News
              </h1>
      <CategoryNewsList newsData={newsData} />
    </div>
  );
};

export default CategoryPage;
