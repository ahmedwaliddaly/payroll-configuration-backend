
import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import {  EmployeeProfile as Employee} from '../../employee-profile/Models/employee-profile.schema';
import { ConfigStatus } from '../enums/payroll-configuration-enums';

export type taxRulesDocument = HydratedDocument<taxRules>

@Schema({ timestamps: true })
export class taxRules {
    @Prop({ required: true, unique: true })
    name: string;
    @Prop()
    description?: string;
    @Prop({ required: true, min: 0 })
    rate: number;// tax rate in percentage

    @Prop({ required: true, type: String, enum: ConfigStatus,default:ConfigStatus.DRAFT })
    status: ConfigStatus;// draft, approved, rejected
    

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'employee-profile' })
    createdBy?: mongoose.Types.ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'employee-profile' })
    approvedBy?: mongoose.Types.ObjectId;
    @Prop({})
    approvedAt?: Date


}

export const taxRulesSchema = SchemaFactory.createForClass(taxRules);
