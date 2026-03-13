import mongoose, { Model, InferSchemaType } from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    message: String,
  },
  { timestamps: true }
);

export type IMessage = InferSchemaType<typeof MessageSchema> & { _id: mongoose.Types.ObjectId };

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
