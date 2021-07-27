/* eslint-disable @typescript-eslint/ban-types */
import { Document } from 'mongoose';

export interface ISupplier extends Document {
  readonly supplierName: string;
  readonly phoneList: [];
  readonly direction: string;
  readonly email: string;
}
