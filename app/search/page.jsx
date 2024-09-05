// "use client";

// import { useSearchParams } from "next/navigation"; // Import useSearchParams
// import { useEffect, useState } from "react";
// import NewsCard from "@components/NewsCard"; // Import the NewsCard component

// const SearchPage = () => {
//   const searchParams = useSearchParams(); // Get the search parameters
//   const q = searchParams.get("q"); // Extract the query parameter
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (q) {
//       // Fetch search results from the API
//       const fetchSearchResults = async () => {
//         try {
//           const response = await fetch(`/api/news/search?q=${encodeURIComponent(q)}`);
//           if (response.ok) {
//             const data = await response.json();
//             setSearchResults(data);
//           } else {
//             console.error("Failed to fetch search results.");
//           }
//         } catch (error) {
//           console.error("Error fetching search results:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchSearchResults();
//     } else {
//       setLoading(false); // If no query is present, stop loading
//     }
//   }, [q]);

//   if (loading) return <p>Loading...</p>;

//   if (!q || searchResults.length === 0) return <p>No results found for "{q}"</p>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       <h1 className="text-2xl font-semibold mb-4">Search Results for "{q}"</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {searchResults.map((newsItem) => (
//           <NewsCard
//             key={newsItem._id}
//             news={newsItem}
//             // You can pass additional props like handleEdit, handleDelete if needed
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

"use client";

import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { useEffect, useState, Suspense } from "react";
import NewsCard from "@components/NewsCard"; // Import the NewsCard component

const SearchPageContent = () => {
  const searchParams = useSearchParams(); // Get the search parameters
  const q = searchParams.get("q"); // Extract the query parameter
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (q) {
      // Fetch search results from the API
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
      setLoading(false); // If no query is present, stop loading
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
            // You can pass additional props like handleEdit, handleDelete if needed
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

