export interface YoutubeVideoRequest {
  key: string;
  part: string;
  // filters (one of should be used)
  chart?: string;
  id?: string;
  // the rest is optional
  hl?: string;
  maxResults?: number; // Acceptable values are 1 to 50, inclusive.
  pageToken?: string;
  regionCode?: string;
  videoCategoryId?: string;
}
