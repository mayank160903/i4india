"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userBookmarks, setUserBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle error

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`/api/users/${params?.id}/bookmarks`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks");
        }

        const data = await response.json();

        // Ensure that the data is an array
        if (Array.isArray(data)) {
          setUserBookmarks(data);
        } else {
          setUserBookmarks([]); // Set to empty array if not an array
          throw new Error("Invalid data format: Expected an array");
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchBookmarks();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; // Display error message

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s bookmarked news.`}
      newsData={userBookmarks}
    />
  );
};

export default UserProfile;
