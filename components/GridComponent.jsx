"use client";

import React from "react";
import GridNewsCard from "./GridNewsCard";

const GridComponent = ({ latestNews }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Column 1: 2nd and 3rd news items */}
      <div className="flex flex-col gap-4">
        {latestNews.slice(1, 3).map((news, index) => (
          <div key={index}>
            <GridNewsCard
              news={news}
              height="150"
              className="my-2 max-w-full rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Column 2: 1st news item, larger */}
      <div className="md:col-span-1 items-center">
        <GridNewsCard
          news={latestNews[0]}
          height="300"
          className="my-2 max-w-full rounded-lg"
        />
      </div>

      {/* Column 3: 4th and 5th news items */}
      <div className="flex flex-col gap-4 items-center">
        {latestNews.slice(3, 5).map((news, index) => (
          <div key={index}>
            <GridNewsCard
              news={news}
              height="120"
              className="my-2 text-sm max-w-96 rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Column 4: 6th and 7th news items */}
      <div className="flex flex-col gap-4 items-center">
        {latestNews.slice(5, 7).map((news, index) => (
          <div key={index}>
            <GridNewsCard
              news={news}
              height="120"
              className="my-2 text-sm max-w-96 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
