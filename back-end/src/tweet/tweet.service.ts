import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tweet } from './interfaces/tweet.interface';
import { AuthUserDto } from '../users/dto/authUser.dto';

@Injectable()
export class TweetService {
  // injection using token
  constructor(
    @InjectModel('tweet') private readonly tweetModel: Model<Tweet>,
  ) {}

  async getAllTweets(user: AuthUserDto): Promise<Tweet[]> {
    const aggregate = await this.tweetModel.aggregate().limit(5).exec();
    return aggregate;
  }

}
