import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth/auth.service';

@Controller('home')
export class HomeController {
    // Inject the AuthService via the constructor 
    constructor(private readonly authService: AuthService) { }

    // Creating the regiser endpoint 
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        // Call the auth service to handle registration logic
        return this.authService.register(registerDto);
    }

    // Creating the login endpoint
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // Call the auth service to handle login logic
        return this.authService.login(loginDto);
    }
}
