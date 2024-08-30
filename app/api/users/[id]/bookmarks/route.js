import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const userId = params.id;

    // Find the user and populate the bookmarked news
    const user = await User.findById(userId).populate("bookmarkedNews");

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Return the user's bookmarked news
    return new Response(JSON.stringify(user.bookmarkedNews), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch bookmarks" }), {
      status: 500,
    });
  }
};
