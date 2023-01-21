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
  @Get("/all/:collection")
  async getAllTweets(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.getAllTweets(collection);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/schema")
  async getAllSchemaNames(): Promise<any> {
    return this.tweetService.getAllSchemaNames();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/count/:collection")
  async getCountTweets(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.getCountTweets(collection);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/dates/:collection")
  async getDateExtrems(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.getDateExtrems(collection);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/retweet/:collection")
  async getTextMostRetweet(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.getTextMostRetweet(collection);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/top-tweets/:collection")
  async get10MostTweets(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.get10MostTweets(collection);
  }
}
