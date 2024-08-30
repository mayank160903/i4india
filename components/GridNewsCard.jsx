"use client";

import Image from "next/image";
import React from "react";

const GridNewsCard = ({ news, className, height }) => {
  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getEmbedUrl = (url) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&controls=1` : null;
  };

  const embedUrl = getEmbedUrl(news.videoUrl);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}>
      <div className="video_container">
        {embedUrl ? (
          <iframe
            width="100%"
            height={height}
            src={embedUrl}
            title={news.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-t-lg"
          ></iframe>
        ) : (
          <Image src="/assets/icons/i4india.png" width={250} height={96} alt="logo" />
        )}
      </div>
      <div className="p-5 text-sm lg:flex items-center justify-between">
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {new Date(news.createdAt).toLocaleDateString()}
        </div>
        <div className="bg-blue-200 bg-opacity-60 px-2 py-1 rounded-lg items-center">
            {news.category}
        </div>
      </div>
    </div>
  );
};

export default GridNewsCard;
