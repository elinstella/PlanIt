import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Define User interface that extends Mongoose Document
interface IUser extends Document {
  _id: any;
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  categories: string[]; 
}

// Define Mongoose Schema for User
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  categories: { type: [String], default: [] },

});

// Ensure `_id` is always included as `id` in JSON responses
UserSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString(); 
    delete ret._id; 
    delete ret.__v; 
    delete ret.password; 
  },
});

// Add a method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create Mongoose Model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export { User, IUser };
export default User;
