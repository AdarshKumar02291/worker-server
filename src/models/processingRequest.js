const mongoose = require('mongoose');

const processingRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  },
  data: [{
    serialNumber: String,
    productName: String,
    imageUrls: [String],
    processedImageUrls: [String],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ProcessingRequest = mongoose.model('ProcessingRequest', processingRequestSchema);

module.exports = ProcessingRequest;