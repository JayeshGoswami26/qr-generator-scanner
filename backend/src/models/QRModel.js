import mongoose from 'mongoose';

const qrSchema = new mongoose.Schema(
  {
    data: {
      type: Map,
      of: String,
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Convert Map to Object for JSON serialization
qrSchema.methods.toJSON = function() {
  const obj = this.toObject();
  if (obj.data instanceof Map) {
    obj.data = Object.fromEntries(obj.data);
  }
  return obj;
};

const QR = mongoose.model('QR', qrSchema);

export default QR;
