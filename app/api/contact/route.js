import { NextResponse } from 'next/server';
import { connectToDB } from '@utils/database';
import Contact from '@models/Contact'; 

export async function POST(request) {
  try {
    const { email, subject, message } = await request.json();

    // Validate the incoming data
    if (!email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Connect to the database
    await connectToDB();

    // Create a new contact message in the database
    const newContact = new Contact({
      email,
      subject,
      message,
    });

    await newContact.save();

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
