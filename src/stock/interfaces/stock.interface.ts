/* eslint-disable @typescript-eslint/ban-types */
import { Document } from 'mongoose';

export interface IStock extends Document {
  readonly itemdDescription: string;
  readonly quantityPortion: number;
  readonly registerDate: Date;
}
