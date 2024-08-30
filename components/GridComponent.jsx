"use client";

import React from "react";
import GridNewsCard from "./GridNewsCard";

const GridComponent = ({ latestNews }) => {
  return (
    <div className="grid gap-4">
      {/* Top row: Two larger news cards side by side */}
      <div className="grid grid-cols-2 gap-4">
        {latestNews.slice(0, 2).map((news, index) => (
          <div key={index}>
            <GridNewsCard
              news={news}
              height="300"
              className="h-300 max-w-full rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Grid of smaller news items */}
      <div className="grid grid-cols-5 gap-4">
        {latestNews.slice(2, 7).map((news, index) => (
          <div key={index}>
            <GridNewsCard
              news={news}
              height={160}
              className="h-200 max-w-full rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
