"use client";

import { useState, useEffect, useRef } from "react";
import NewsCard from "./NewsCard";

const categories = [
  "General",
  "Business",
  "Entertainment",
  "Sports",
  "Science",
  "Technology",
  "Education",
  "History",
];

const NewsCardList = ({ newsData, category }) => {
  const scrollRef = useRef(null);

  return (
    <div className="mb-8 max-w-10xl mt-5 mx-10">
      <div className="text-4xl font-serif mb-4">
        <div className="bg-blue-100 bg-opacity-55 rounded-lg font-light w-full text-black p-3">{category}</div>
      </div>
      <div className="relative">
        {/* Scrollable area with custom scrollbar */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scrollbar-hide hover:scrollbar-visible scroll-smooth custom-scrollbar"
        >
          {newsData.map((news) => (
            <div key={news._id} className="flex-shrink-0 mr-32 gap-5 w-72">
              <NewsCard news={news} />
            </div>
          ))}
        </div>
        <hr className="mt-3" />
      </div>
    </div>
  );
};

const Feed = () => {
  const [allNews, setAllNews] = useState([]);

  // Fetch news data from the API
  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      let data = await response.json();

      data = Array.isArray(data)
        ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

      setAllNews(data);
      // Ensure data is an array before setting it
      
      // setAllNews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setAllNews([]); // Set to an empty array on error
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Get news by category
  const getNewsByCategory = (category) => {
    // Ensure allNews is an array before filtering
    return Array.isArray(allNews)
      ? allNews.filter((news) => news.category === category)
      : [];
  };

  return (
    <section className="feed">
        {categories.map((category) => (
          <NewsCardList
            key={category}
            newsData={getNewsByCategory(category)}
            category={category}
          />
        ))}
    </section>
  );
};

export default Feed;