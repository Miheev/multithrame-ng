export interface YoutubeCategory {
  kind?: string;
  etag?: string;
  id: string;
  snippet: {
    channelId: string;
    title: string;
    assignable: boolean;
  };
}
