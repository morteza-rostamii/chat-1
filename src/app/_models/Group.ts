import mongoose, {model, models, Schema} from 'mongoose'
import { IGroup } from '../../dtos/group-dto';

const GroupSchema = new Schema<IGroup>(
  // fields
  {
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    // Group has => one owner
    owner: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    // members: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // }],
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message',
      // Additional member data fields here
    }],
    
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