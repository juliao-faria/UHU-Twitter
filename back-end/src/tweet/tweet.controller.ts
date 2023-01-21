import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { TweetService } from './tweet.service';
import { Tweet } from './interfaces/tweet.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/tweets')
export class TweetController {
  // injection using constructor => this will declare and instantiate the TweetService at the same place
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTweets(@Request() req: any): Promise<Tweet[]> {
    return this.tweetService.getAllTweets();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("/a")
  async getAllTweets2(): Promise<any> {
    return this.tweetService.getAllTweets();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/schema")
  async getAllSchemaNames(): Promise<any> {
    return this.tweetService.getAllSchemaNames();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/count")
  async getCountTweets(): Promise<any> {
    return this.tweetService.getCountTweets();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/dates")
  async getDateExtrems(): Promise<any> {
    return this.tweetService.getDateExtrems();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/retweet")
  async getTextMostRetweet(): Promise<any> {
    return this.tweetService.getTextMostRetweet();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/top-tweets")
  async get10MostTweets(): Promise<any> {
    return this.tweetService.get10MostTweets();
  }
}
