import mongoose, { Model, InferSchemaType } from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    settings: {
      type: {
        problemLimit: {
          type: Number,
          default: 10,
        },
        articleLimit: { type: Number, default: 10 },
      },
      required: true,
      default: {},
    },
  },
  { timestamps: true }
);

export type IUser = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

const User: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
