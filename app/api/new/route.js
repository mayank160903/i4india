import News from '@/models/News';
import User from '@/models/user';
import { connectToDB } from '@utils/database';

export async function POST(req, res) {
  await connectToDB();

  const session = await getSession({ req }); 
  if (!session || !session.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { videoUrl, title, description, category } = await req.json();

  try {
    const news = new News({ videoUrl, title, description, category });
    await news.save();
    return res.status(201).json(news);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function PUT(req, res) {
  await connectToDB();

  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { id, updatedData } = await req.json();

  try {
    const news = await News.findByIdAndUpdate(id, updatedData, { new: true });
    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function DELETE(req, res) {
  await connectToDB();

  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { id } = await req.json();

  try {
    await News.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
