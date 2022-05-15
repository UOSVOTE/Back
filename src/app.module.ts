import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ElectionController } from './election/election.controller';
import { ElectionService } from './election/election.service';
import { HyperledgerService } from './hyperledger.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, ConfigModule.forRoot()],
  controllers: [UserController, ElectionController],
  providers: [UserService, PrismaService, ElectionService, HyperledgerService],
})
export class AppModule {}
