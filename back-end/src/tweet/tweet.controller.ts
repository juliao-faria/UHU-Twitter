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

  @UseGuards(JwtAuthGuard)
  @Get("/likes/:collection")
  async getTextMostLikes(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.getTextMostLikes(collection);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/lang/:collection")
  async getTweetsByLang(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.getTweetsByLang(collection);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/top-urls/:collection")
  async get10Urls(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.get10Urls(collection);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/top-mentions/:collection")
  async get10Mentions(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.get10Mentions(collection);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/top-anotations/:collection")
  async get10AnotationsByType(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.get10AnotationsByType(collection);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/countries/:collection")
  async get10Places(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.get10Places(collection);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/parametric/:collection")
  async parametricQuery(@Param('collection') collection: string, @Body() body: any): Promise<any> {
    return this.tweetService.parametricQuery(collection, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/user-names/:collection")
  async getUserNames(@Param('collection') collection: string): Promise<any> {
    return this.tweetService.getUserNames(collection);
  }
}
