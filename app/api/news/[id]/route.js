import News from "@models/News";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const news = await News.findById(params.id);
        if (!news) return new Response("News Not Found", { status: 404 });

        return new Response(JSON.stringify(news), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PUT = async (request, { params }) => {

    try {
        const { videoUrl, title, description, category } = await request.json();
        
        await connectToDB();
    
        // Find the existing news by ID
        const existingNews = await News.findById(params.id);
    
        if (!existingNews) {
          return new Response("News not found", { status: 404 });
        }
    
        // Update the news with new data
        if (videoUrl) existingNews.videoUrl = videoUrl;
        if (title) existingNews.title = title;
        if (description) existingNews.description = description;
        if (category) existingNews.category = category;
    
        await existingNews.save();
    
        return new Response("Successfully updated the news", { status: 200 });
      } catch (error) {
        console.error("Error Updating News:", error);
        return new Response("Error Updating News", { status: 500 });
      }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the news by ID and remove it
        await News.findByIdAndDelete(params.id);

        return new Response("News deleted successfully", { status: 200 });
    } catch (error) {
        console.error("error updating news:", error);
        return new Response("Error deleting news", { status: 500 });
    }
};