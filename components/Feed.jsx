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

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-8 max-w-10xl mt-5 mx-10">
      <div className="text-4xl font-serif mb-4">
        <div className="bg-blue-100 bg-opacity-55 rounded-lg font-light w-full text-black p-3">{category}</div>
      </div>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-0 transform -translate-x-5 -translate-y-1/2 bg-gray-500 bg-opacity-70 text-white px-4 py-2 rounded-full"
        >
          &lt;
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-32 scrollbar-hide"
        >
          {newsData.map((news) => (
            <div key={news._id} className="flex-shrink-0 w-72">
              <NewsCard news={news} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-0 transform translate-x-5 -translate-y-1/2 bg-gray-500 bg-opacity-70 text-white px-4 py-2 rounded-full"
        >
          &gt;
        </button>
        <hr className="mt-3" />
      </div>
    </div>
  );
};

const Feed = () => {
  const [allNews, setAllNews] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  // Fetch news data from the API
  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      const data = await response.json();
      // Ensure data is an array before setting it
      setAllNews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setAllNews([]); // Set to an empty array on error
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Filter news based on search text
  const filterNews = (searchText) => {
    const regex = new RegExp(searchText, "i"); // Case-insensitive search
    return allNews.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.category) ||
        regex.test(item.description)
    );
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim()) {
      const searchResult = filterNews(value);
      setSearchedResults(searchResult);
    } else {
      setSearchedResults([]);
    }
  };

  // Get news by category
  const getNewsByCategory = (category) => {
    // Ensure allNews is an array before filtering
    return Array.isArray(allNews)
      ? allNews.filter((news) => news.category === category)
      : [];
  };

  return (
    <section className="feed">
      {/* Search Input */}
      <form className="relative mx-10 w-80 flex-center">
        <input
          type="text"
          placeholder="Search by title, category, or description"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      {/* Display filtered news or all news by category */}
      {searchText ? (
        <NewsCardList newsData={searchedResults} category="Search Results" />
      ) : (
        categories.map((category) => (
          <NewsCardList
            key={category}
            newsData={getNewsByCategory(category)}
            category={category}
          />
        ))
      )}
    </section>
  );
};

export default Feed;
