import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface Ivideo {
  title: string;
  description: string;
  url: string;
  _id?: mongoose.Types.ObjectId;
  control?: boolean;
  thumbnail?: string;
  createdAt?: Date;
  transformations?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const videoSchema = new Schema<Ivideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    thumbnail: { type: String, required: true },
    control: { type: Boolean, default: true },
    transformations: {
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

const Video = models?.Video || model<Ivideo>("Video", videoSchema);
export default Video;
