import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ElectionService } from './election.service';

@UseGuards(JwtAuthGuard)
@Controller('election')
export class ElectionController {
  constructor(private readonly electionService: ElectionService) {}

  @Post()
  createElection(@Request() req) {
    return this.electionService.createElection(
      req.user.email,
      req.body.createElectionDTO,
      req.body.candidates,
    );
  }

  @Get('/encryptionKey/:id')
  encryptionKey(@Param('id') electionId, @Request() req) {
    return this.electionService.encryptionKey(electionId);
  }

  @Get('/ballot/:id')
  getBallots(@Param('id') electionId, @Request() req) {
    return this.electionService.getBallots(req.user.email, electionId);
  }

  @Get('/myballot/:id')
  getBallot(@Param('id') electionId, @Request() req) {
    return this.electionService.getMyBallot(req.user.email, electionId);
  }

  @Get('/result/:id')
  result(@Param('id') electionId, @Request() req) {
    return this.electionService.getResult(req.user.email, electionId);
  }

  @Get('/electionResult/:id')
  electionRes(@Param('id') electionId, @Request() req) {
    return this.electionService.getElectionResult(parseInt(electionId));
  }

  @Get('/voterNum/:id')
  getVoterNum(@Param('id') electionId, @Request() req) {
    return this.electionService.getVoterNum(req.user.email, electionId);
  }

  @Post('/addballot/:id')
  addBallot(@Param('id') electionId, @Request() req) {
    if (req.user.role != 'admin') {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.electionService.addBallots(req.user.email, electionId);
  }

  @Post('/decryptResult/:id')
  decrypt(@Param('id') electionId, @Request() req) {
    if (req.user.role != 'admin') {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.electionService.decryptResult(req.user.email, electionId);
  }

  @Post('/:id')
  vote(@Param('id') electionId, @Request() req) {
    return this.electionService.vote(
      req.user.email,
      parseInt(electionId),
      req.body.ballot,
    );
  }

  @Patch('/:id')
  editElection(@Param('id') electionId, @Request() req) {
    return this.electionService.extendEndDate(
      req.user.email,
      parseInt(electionId),
      req.body.newEndDate,
    );
  }

  @Get('/:id')
  getElection(@Param('id') electionId, @Request() req) {
    return this.electionService.getElection(
      req.user.email,
      parseInt(electionId),
    );
  }

  @Get()
  getElections(@Request() req) {
    return this.electionService.getAllElection(req.user.email);
  }
}
