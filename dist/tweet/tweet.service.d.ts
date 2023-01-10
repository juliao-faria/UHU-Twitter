import { Model } from 'mongoose';
import { Tweet } from './interfaces/tweet.interface';
import { AuthUserDto } from '../users/dto/authUser.dto';
export declare class TweetService {
    private readonly tweetModel;
    constructor(tweetModel: Model<Tweet>);
    getAllTweets(user: AuthUserDto): Promise<Tweet[]>;
}
