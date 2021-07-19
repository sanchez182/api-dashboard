import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'tables' })
export class Table extends Document {
  @Prop({ required: true, unique: true })
  tableNumber: number;

  @Prop({ type: Boolean })
  selected: boolean;

  @Prop()
  type: string;

  @Prop()
  state: string;
}

export const TableSchema = SchemaFactory.createForClass(Table);
