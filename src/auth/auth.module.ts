import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HyperledgerService } from 'src/hyperledger.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.jwtSecret }),
    MailerModule.forRoot({
      transport: {
        service: 'Outlook365',
        host: 'smtp.office365.com',
        port: 587,
        secure: true,
        auth: {
          user: "yunoa64@outlook.com",
          pass: "3578pqckdx",
        },
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new EjsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
    UserService,
    HyperledgerService,
  ],
})
export class AuthModule {}
