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
    <div className={`bg-white rounded-sm dark:bg-gray-800 ${className}`}>
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
            className="rounded-t-sm"
          ></iframe>
        ) : (
          <Image src="/assets/icons/i4india.png" width={250} height={96} alt="logo" />
        )}
      </div>
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2 text-black">{news.title}</h2>
        <p className="text-gray-700 mb-3">{news.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{new Date(news.createdAt).toLocaleDateString()}</span>
          <span className="text-white bg-gray-700 px-2 py-1 rounded-sm">{news.category}</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default GridNewsCard;
