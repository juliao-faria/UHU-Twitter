import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseProvider } from 'src/mongoose/mongo.conection';

import { TweetSchema } from './models/tweet.model';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'tweet', schema: TweetSchema }]),
  ],
  controllers: [TweetController],
  providers: [TweetService, TweetService, MongooseProvider],
})
export class TweetModule {}
