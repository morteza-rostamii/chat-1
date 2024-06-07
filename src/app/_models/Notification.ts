import mongoose, {model, models, Schema} from 'mongoose'

const NotificationSchema = new Schema<any>(
  // fields
  {
    //@rel
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {type: String},
    link: {type: String},
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

const Notification = models.Notification || model('Notification', NotificationSchema);
export default Notification;