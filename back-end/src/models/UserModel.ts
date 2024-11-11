import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  userName: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
  votedFor: Types.ObjectId | null;
}

const UserSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "User name must be at least 3 characters long"],
    maxlength: [20, "User name must be at most 20 characters long"],
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    required: true,
    type: Boolean,
    default: false,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  },
  votedFor: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
    default: null,
  },
});

export default mongoose.model<IUser>("UserSchema", UserSchema);
