"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditNews = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newsId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    videoUrl: "",
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const getNewsDetails = async () => {
      try {
        const response = await fetch(`/api/news/${newsId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }

        const data = await response.json();

        // Set the fetched data into the form
        setPost({
          videoUrl: data.videoUrl || "",
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
        });
      } catch (error) {
        console.error("Error loading news data:", error);
      }
    };

    if (newsId) getNewsDetails();
  }, [newsId]);

  const updateNews = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!newsId) return alert("News ID not found!");

    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoUrl: post.videoUrl,
          title: post.title,
          description: post.description,
          category: post.category,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to update news");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateNews}
    />
  );
};

export default EditNews;

