import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('/signup')
  async signUp(
    @Body() createUserDto: SignUpUserDto,
  ): Promise<{ token: string }> {
    return this.authService.signUpUser(createUserDto);
  }

  // Login a user
  @Get('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.loginUser(loginDto);
  }
}
