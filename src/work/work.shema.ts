import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type WorkDocument = Work & mongoose.Document;

@Schema()
export class Work {
  @Prop({ default: 'backend node.js programmer' })
  position: 'backend node.js programmer' | 'cleaner';

  @Prop({ default: 'iogru' })
  work: 'iogru' | 'вкусная точка';

  @Prop({ default: 'Moscow' })
  location: 'Moscow' | 'online' | 'USE' | 'сыктывкар';
}
export const WorkSchema = SchemaFactory.createForClass(Work);
