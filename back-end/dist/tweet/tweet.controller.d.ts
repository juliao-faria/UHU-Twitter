import { TweetService } from './tweet.service';
import { Tweet } from './interfaces/tweet.interface';
export declare class TweetController {
    private readonly tweetService;
    constructor(tweetService: TweetService);
    getAllTweets(req: any): Promise<Tweet[]>;
}
