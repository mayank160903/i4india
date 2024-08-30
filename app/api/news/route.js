import { connectToDB } from "@utils/database";
import News from "@models/News";

export const GET = async (request) => {
  try {
    await connectToDB();

    // Try fetching the data without populate first
    const newsData = await News.find({});

    return new Response(JSON.stringify(newsData), {
      status: 200,
    });
  } catch (error) {
    // Log the error to the server console
    console.error("Error fetching news data:", error);

    // Return a JSON error response
    return new Response(JSON.stringify({ message: "Failed to fetch news.", error: error.message }), {
      status: 500,
    });
  }
};
