import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { SignUpUserDto } from './dto/signup.dto';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  // SignUp User
  async signUpUser(user: SignUpUserDto): Promise<{ token: string }> {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await this.userModel.create({
        ...user,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const token = await APIFeatures.assignJwtToken(
        newUser._id,
        this.jwtService,
      );
      return { token };
    } catch (error) {
      // Handle duplicate email error
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
    }
  }

  // Login User
  async loginUser(loginUser: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginUser;
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if email matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await APIFeatures.assignJwtToken(user._id, this.jwtService);
    return { token };
  }
}
