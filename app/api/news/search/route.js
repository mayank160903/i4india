import News from '@models/News';
import { connectToDB } from '@utils/database';

export const GET = async (request, {params}) => {
  console.log("testing search route");
  try {
    await connectToDB();

    // Extract query parameters for search
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q');

    // Search for news articles matching the query in the title or description
    const searchResults = await News.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } },

      ]
    });

    console.log(searchResults);

    return new Response(JSON.stringify(searchResults), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch search results' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
