// Importing the necessary modules
import { Injectable, ConflictException, UnauthorizedException, HttpCode } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { User, UserDocument } from '../../users/schemas/user.schema';

@Injectable()
export class AuthService {
    // Inject the Mongoose Model into the class constructor 
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService

    ) { }

    /**
     * Handles registering a brand new user
     */
    async register(registerDto: RegisterDto) {
        // Getting the registration details from the registerDto object 
        const { name, email, password } = registerDto;

        // Checking if the user exists on the mongodb database 
        const user = await this.userModel.findOne({ email });

        // If the user exists, return an error message 
        if (user) {
            // Building the response message 
            const responseMessage = {
                message: 'An account with this email already exists.',
                statusCode: 409,
                status: "error"
            }

            // Sending the response message 
            return responseMessage;
        }

        // Else if the user does not exist 
        // Create a new user on the database 
        else {
            // Hash the users password 
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            // Create a new user document 
            const newUser = new this.userModel({
                name,
                email,
                password: passwordHash,
            });

            // Save the new user document to the database 
            await newUser.save();

            // Return the success response message 
            const responseMessage = {
                message: 'Registration successful',
                status: "success",
                statusCode: 201
            }

            // Sending the response message 
            return responseMessage;
        }
    }


    /**
     * Handles authenticating an existing user
     */
    async login(loginDto: LoginDto) {
        // Getting the login details from the loginDto object 
        const { email, password } = loginDto;

        // Checking if the user exists on the mongodb database 
        const user = await this.userModel.findOne({ email });

        // If the exists on the database, check the password 
        if (user) {
            // Compare the incoming plain password with the stored encrypted hash
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // If the password is valid, create a json web token and return the token and users status
            if (isPasswordValid) {
                // if the password is valid, create a json web token and return 
                // the token and users status 
                const payload = {
                    sub: user._id,
                    email: user.email,
                    time: new Date().getTime(),
                    isLoggedIn: true
                };

                // Generate the real token 
                const token = this.jwtService.sign(payload)

                // Building the response message 
                const responseMessage = {
                    message: 'Login successful',
                    status: "success",
                    statusCode: 200,
                    token: token
                };

                // Returning the success response message 
                return responseMessage;

            }

            // Else if the password is not valid, return an error message
            else {
                // Building the response message 
                const responseMessage = {
                    message: 'Invalid email or password',
                    status: "error",
                    statusCode: 401
                };

                // Returning the error response message 
                return responseMessage;
            }

        }

        // Else if the user does not exist on the database, return an error message
        else {
            // If the user does not exist, return an error message 
            const responseMessage = {
                message: 'Invalid email or password',
                status: "error",
                statusCode: 401
            };

            // Returning the error response message 
            return responseMessage;
        }
    }
}