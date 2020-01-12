import * as moment from 'moment';
import { YoutubeVideo } from '@fav/youtubeApi/models';

export class VideoModel {
  id = '';
  title = '';
  publishedAt = '';
  channelTitle = '';
  thumbnail = '';
  viewCount = '0';
  likeCount = '0';
  commentCount = '0';
  likeRate = 0;
  tags = '';

  static toNumber(value: string): number {
    let num = parseInt(value, 10);
    return isNaN(num) ? 0 : num;
  }

  constructor(data?: YoutubeVideo) {
    if (!data || !data['snippet'] || !data['statistics']) {
      return;
    }

    this.id = data.id;
    this.title = data.snippet.title;
    this.thumbnail = data.snippet.thumbnails.high.url;
    this.publishedAt = moment(data.snippet.publishedAt).fromNow();
    this.channelTitle = data.snippet.channelTitle;

    this.viewCount = data.statistics.viewCount;
    this.likeCount = data.statistics.likeCount;
    this.commentCount = data.statistics.commentCount;

    let dislike = VideoModel.toNumber(data.statistics.dislikeCount);
    let like = VideoModel.toNumber(data.statistics.likeCount);
    this.likeRate = Math.round(like / (like + dislike) * 100);

    this.tags = data.snippet.tags && data.snippet.tags.join(', ');
  }
}
