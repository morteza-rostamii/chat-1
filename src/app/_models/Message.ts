import mongoose, {model, models, Schema} from 'mongoose'
import { IMessage } from '../../dtos/message-dto';

const MessageSchema = new Schema<IMessage>(
  // fields
  {
    content: {type: String},
    image: {type: String},

    //@rel
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // parent message
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

const Message = models.Message || model('Message', MessageSchema);
export default Message;