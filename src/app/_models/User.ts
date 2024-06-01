import {model, models, Schema} from 'mongoose'
import { IUser } from '../../dtos/user-dto';

const UserSchema = new Schema<IUser>(
  // fields
  {
    username: {type: String, trim: true},
    email: {type: String, required: true, trim: true},
    //otp: {type: String,}
  },
  // options
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const User = models.User || model('User', UserSchema);
export default User;