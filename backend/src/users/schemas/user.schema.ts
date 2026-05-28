// Importing the necessary modules 
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Defining the User document interface
export type UserDocument = HydratedDocument<User>;

// Defining the User schema using decorators
@Schema({
    timestamps: true,
    collection: "users"
})

// Exporting the class User 
export class User {
    // Creating the name property 
    @Prop({
        required: true,
        trim: true
    })
    name: string;

    // Creating the email property 
    @Prop({
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    })
    email: string;

    // Creating the password property 
    @Prop({
        required: true,
        minlength: 6
    })
    password: string;

    // Creating the createAt property 
    @Prop({
        default: Date.now
    })
    createdAt: Date;
}

// Exporting the user schema 
export const UserSchema = SchemaFactory.createForClass(User);