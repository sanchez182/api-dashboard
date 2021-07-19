/* eslint-disable @typescript-eslint/ban-types */
import { Document } from 'mongoose';

export interface ITable extends Document {
  readonly tableNumber: number;
  readonly selected: boolean;
  readonly type: string;
  readonly state: string;
}
