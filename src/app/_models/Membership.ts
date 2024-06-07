import mongoose, {model, models, Schema} from 'mongoose'
import { IMembership } from '../../dtos/membership-dto';

const MembershipSchema = new Schema<IMembership>(
  // fields
  {
    //@rel
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
  
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    role: {
      type: String,
      enum: ['owner', 'member'],
      default: 'member',
    },
    //@ts-ignore
    joinedAt: {type: Date , default: Date.now},
  
    createdAt: Date,
    updatedAt: Date,
  },
  // options
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Membership = models.Membership || model('Membership', MembershipSchema);
export default Membership;