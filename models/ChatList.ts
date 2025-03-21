import mongoose, { Schema } from 'mongoose';

const chatListSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    chatWith: { type: Schema.Types.ObjectId, ref: 'users', required: true },

});

export default mongoose.model('ChatList', chatListSchema);
