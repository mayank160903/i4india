const mongoose = require('mongoose');
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: String,
    email:{
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    image:{
        type: String,
    },
    isAdmin: { type: Boolean, default: false },
    bookmarkedNews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }]
})

const User = models.User || model("User", UserSchema)

export default User