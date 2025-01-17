import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  userId: string;
  symbol: string;
  threshold: number;
  direction: 'above' | 'below';
}

const AlertSchema: Schema = new Schema({
  userId: { type: String, required: true },
  symbol: { type: String, required: true },
  threshold: { type: Number, required: true },
  direction: { type: String, enum: ['above', 'below'], required: true },
});

export default mongoose.model<IAlert>('Alert', AlertSchema);