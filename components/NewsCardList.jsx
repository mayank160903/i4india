"use client";

import { useRef } from "react";
import NewsCard from "./NewsCard";

const NewsCardList = ({ newsData, category, handleEdit, handleDelete }) => {
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
              <NewsCard news={news} 
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              />
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

export default NewsCardList;
