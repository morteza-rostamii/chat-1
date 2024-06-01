import {model, models, Schema} from 'mongoose'

const OtpSchema = new Schema<any>(
  // fields
  {
    email: {type: String, required: true},
    otp: {type: String, required: true},
    createdAt: {
      type: Date,
      default: Date.now,
      // 5 minutes
      expires: 60 * 5,
    },
  },
  // options
  {
    //timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// send email
async function sendOtpEmail(email:any, otp:any) {
  try {
    // const mailResponse = await mailSender(
    //   "Verification Email",
    //   `<h1>Please confirm your OTP</h1>
    //    <p>Here is your OTP code: ${otp}</p>`,
    // );
    
  }
  catch(err:any) {
    console.log('Error while sending email', err);
    throw err;
  }
}

// new otp was saved =: send email
// runs on .save() and .create()
OtpSchema.pre('save', async function(next:any) {
  // if: new otp was saved
  if (this.isNew) {
    //await sendOtpEmail(this.email, this.otp);
    console.log('OTP: ', this.email, this.otp);
  }
  next();
});

const Otp = models.Otp || model('Otp', OtpSchema);
export default Otp;