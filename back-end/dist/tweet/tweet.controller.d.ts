import { TweetService } from './tweet.service';
import { Tweet } from './interfaces/tweet.interface';
export declare class TweetController {
    private readonly tweetService;
    constructor(tweetService: TweetService);
    getAllTweets(req: any): Promise<Tweet[]>;
    getAllTweets2(): Promise<any>;
    getAllSchemaNames(): Promise<any>;
    getCountTweets(): Promise<any>;
    getDateExtrems(): Promise<any>;
    getTextMostRetweet(): Promise<any>;
    get10MostTweets(): Promise<any>;
}
