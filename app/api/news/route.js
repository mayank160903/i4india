import { connectToDB } from "@utils/database";
import News from "@models/News";

export const GET = async (request) => {
  try {
    await connectToDB();


    const newsData = await News.find({});

    return new Response(JSON.stringify(newsData), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching news data:", error);

    return new Response(JSON.stringify({ message: "Failed to fetch news.", error: error.message }), {
      status: 500,
    });
  }
};
