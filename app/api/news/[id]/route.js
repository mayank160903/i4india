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

export const PATCH = async (request, { params }) => {
    

    try {
        const { news, tag } = await request.json();

        await connectToDB();

        // Find the existing news by ID
        const existingPrompt = await News.findById(params.id);
        console.log(existingPrompt);

        if (!existingPrompt) {
            return new Response("News not found", { status: 404 });
        }

        // Update the news with new data
        if (news) existingNews.news = news;
        if (tag) existingNews.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
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