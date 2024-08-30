"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const NewsCard = ({ news, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const [isBookmarked, setIsBookmarked] = useState(
    news.bookmarks?.includes(session?.user.id)
  );

  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  

  const DESCRIPTION_LIMIT = 150; // Limit for the truncated description

  const convertToISTTimeOnly = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatToIST = (date) => {
    if (!date) return "Date not available";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return "Invalid Date";

    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-IN", options).format(parsedDate);
  };


  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getEmbedUrl = (url) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?modestbranding=0&rel=0&controls=1&showinfo=0` : null;
  };

  const handleViewVideo = () => {
    window.open(news.videoUrl, "_blank");
  };

  const handleBookmark = async () => {
    try {
      const response = await fetch("/api/bookmark", {
        method: "PATCH",
        body: JSON.stringify({
          userId: session?.user.id,
          newsId: news._id,
        }),
      });

      if (response.ok) {
        setIsBookmarked(true);
        news.bookmarks.push(session?.user.id);
      }
    } catch (error) {
      console.error("Failed to bookmark news:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.description,
          url: news.videoUrl, // Share current URL or the news URL
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      setIsSharePopupVisible(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
    }).catch((error) => {
      console.error("Failed to copy link:", error);
    });
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const embedUrl = getEmbedUrl(news.videoUrl);

  return (
    <div className="bg-white w-96 border max-w-2xl border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-4 p-4 flex flex-col justify-between">
      <div className="video_container mb-4">
        {embedUrl ? (
          <iframe
            width="100%"
            height="200"
            src={embedUrl}
            title={news.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-t-lg"
          ></iframe>
        ) : (
          <Image
            src="/assets/icons/i4india.png"
            width={200}
            height={30}
            alt="logo"
            className="mx-auto"
          />
        )}
      </div>
      <div className="flex-grow">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {news.title}
        </h5>
        {/* <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
          {news.description}
        </p> */}
        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
          {showFullDescription
            ? news.description
            : news.description.slice(0, DESCRIPTION_LIMIT)}
          {news.description.length > DESCRIPTION_LIMIT && (
            <span
              onClick={toggleDescription}
              className="text-blue-600 cursor-pointer hover:underline ml-2"
            >
              {showFullDescription ? "Read Less" : "...Read More"}
            </span>
          )}
        </p>
        <p className="text-gray-500 text-xs mb-4">
          Published on: {convertToISTTimeOnly(news.createdAt)}
        </p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            <span className="ml-2">{news.bookmarks?.length || 0}</span>
            <button className="ml-5 items-center" onClick={handleShare}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>

            </button>
          </div>
          <button onClick={handleViewVideo} className="text-blue-600 hover:underline">
            View Video
          </button>
        </div>
      </div>

      {isSharePopupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Share this news</h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={copyToClipboard}
                className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                Copy Link
              </button>
              <button
                onClick={() => setIsSharePopupVisible(false)}
                className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {session?.user?.email === "mayank.g21@iiits.in" && handleEdit && handleDelete && (
        <div className="mt-5 flex gap-4 border-t border-gray-100 pt-3">
          <button
            className="text-sm text-green-600 hover:underline"
            onClick={() => handleEdit(news._id)}
          >
            Edit
          </button>
          <button
            className="text-sm text-red-600 hover:underline"
            onClick={() => handleDelete(news._id)}
          >
            Delete
          </button>
        </div>
      )}

      {!isBookmarked && session?.user && session?.user?.email !== "mayank.g21@iiits.in" && (
        <button
          className="mt-4 w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          onClick={handleBookmark}
        >
          Add to bookmarks
        </button>
      )}

      {isBookmarked && session?.user?.email !== "mayank.g21@iiits.in" && (
        <div className="mt-4 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="text-sm">Added to Bookmarks!</span>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
