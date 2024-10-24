import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        } else {
          console.error("User not found in session callback.");
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error.message);
        throw new Error("Failed to retrieve session user.");
      }
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

 
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  }
})

export { handler as GET, handler as POST }