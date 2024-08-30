import News from "@models/News";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, title, videoUrl, description, category, } = await request.json();

    try {
        await connectToDB();
        const newNews = new News({ creator: userId, title, videoUrl, description, category});

        await newNews.save();
        return new Response(JSON.stringify(newNews), { status: 201 })
    } catch (error) {
        return new Response("Failed to post the news", { status: 500 });
    }
}