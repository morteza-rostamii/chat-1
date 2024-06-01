import mongoose, {model, models, Schema} from 'mongoose'
import { IGroup } from '../../dtos/group-dto';

const GroupSchema = new Schema<IGroup>(
  // fields
  {
    name: {type: String, required: true},
    // Group has => one owner
    owner: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
  },
  // options
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Group = models.Group || model('Group', GroupSchema);
export default Group;