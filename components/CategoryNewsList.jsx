import NewsCard from "./NewsCard";

const CategoryNewsList = ({ newsData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-6 lg:grid-cols-4 gap-4 p-4">
      {newsData.map((newsItem) => (
        <NewsCard key={newsItem._id} news={newsItem} />
      ))}
    </div>
  );
};

export default CategoryNewsList;
