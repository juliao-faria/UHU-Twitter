import { Document } from 'mongoose';

export interface Tweet extends Document {
    data: [{
      author_id: String,
      created_at: String,
      edit_history_tweet_ids: [{
        type: String,
      }],
      entities: [{
        mentions: [{
          start: Number,
          end: Number,
          username: String,
          id: String,
        }],
        anotations: [{
          start: Number,
          end: Number,
          probability: Number,
          type: String,
          normalized_text: String
        }],
        urls: [{
          start: Number,
          end: Number,
          expanded_url: String,
          url: String,
          display_url: String,
          media_key: String
        }],
        hashtags: [{
          start: Number,
          end: Number,
          tag: String
        }],
      }],
      geo: [{
        place_id: String
      }],
      id: String,
      lang: String,
      public_metrics: [{
        retweet_count: Number,
        reply_count: Number,
        like_count: Number,
        quote_count: Number
      }],
      referenced_tweets: [{
        type: String,
        id: String
      }],
      text: String
    }],
    includes: [{
      users: [{
        created_at: String,
        description: String,
        entities: [{
          url: [{
            urls: [{
              start: Number,
              end: Number,
              url: String,
              expanded_url: String,
              display_url: String
            }]
          }],
          description: [{
            hashtags: [{
              start: Number,
              end: Number,
              tag: String,
            }],
            mentions: [{
              start: Number,
              end: Number,
              username: String,
            }]
          }]
        }],
        id: String,
        name: String,
        public_metrics: [{
          followers_count: Number,
          following_count: Number,
          tweet_count: Number,
          listed_count: Number
        }],
        username: String,
        verified: Boolean,
        location: String
      }],
      tweets: [{
        author_id: String,
        created_at: String,
        id: String,
        lang: String,
        text: String,
        edit_history_tweet_ids: [String],
        entities: [{
          mentions: [{
            start: Number,
            end: Number,
            username: String,
            id: String,
          }],
          anotations: [{
            start: Number,
            end: Number,
            probability: Number,
            type: String,
            normalized_text: String
          }],
          urls: [{
            start: Number,
            end: Number,
            expanded_url: String,
            url: String,
            display_url: String,
            media_key: String
          }],
          hashtags: [{
            start: Number,
            end: Number,
            tag: String
          }],
        }],
        geo: [{
          place_id: String
        }],
        public_metrics: [{
          retweet_count: Number,
          reply_count: Number,
          like_count: Number,
          quote_count: Number
        }],
        referenced_tweets: [{
          type: String,
          id: String
        }]
      }],
      places: [{
        country: String,
        full_name: String,
        name: String
      }]
    }],
    matching_rules: [{
      id: String,
      tag: String
    }]
}
