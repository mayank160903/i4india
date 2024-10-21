"use client";

import { useSearchParams } from "next/navigation"; 
import { useEffect, useState, Suspense } from "react";
import NewsCard from "@components/NewsCard"; 

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q"); 
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (q) {
      
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(`/api/news/search?q=${encodeURIComponent(q)}`);
          if (response.ok) {
            const data = await response.json();
            setSearchResults(data);
          } else {
            console.error("Failed to fetch search results.");
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    } else {
      setLoading(false); 
    }
  }, [q]);

  if (loading) return <p>Loading...</p>;

  if (!q || searchResults.length === 0) return <p>No results found for "{q}"</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Search Results for "{q}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((newsItem) => (
          <NewsCard
            key={newsItem._id}
            news={newsItem}
             />
        ))}
      </div>
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;

