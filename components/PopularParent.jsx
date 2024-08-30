"use client";

import { useEffect, useState } from "react";
import PopularCard from "./PopularCard";

const PopularParent = () => {
  const [popularNews, setPopularNews] = useState([]);
  const [error, setError] = useState(null);

  const fetchPopularNews = async () => {
    try {
      const res = await fetch("/api/news/popular");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setPopularNews(data);
    } catch (error) {
      console.error("Failed to fetch popular news:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPopularNews();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5 bg-blue-300 m-5 rounded-lg">
      <div className="my-3 items-center bg-white text-lg">
        <div className="text-center p-2 items-center font-serif text-5xl">Most Popular News</div>
      </div>
      {popularNews.length > 0 ? (
        <PopularCard popularNews={popularNews} />
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
};

export default PopularParent;
