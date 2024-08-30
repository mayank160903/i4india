"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userBookmarks, setUserBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const response = await fetch(`/api/users/${params?.id}/bookmarks`);
      const data = await response.json();

      setUserBookmarks(data);
    };

    if (params?.id) fetchBookmarks();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s bookmarked news.`}
      newsData={userBookmarks}
    />
  );
};

export default UserProfile;
