import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { WorkDocument } from 'src/work/work.shema';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 50 })
  levelMood: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Work' })
  work?: WorkDocument;
}
export const UserSchema = SchemaFactory.createForClass(User);
