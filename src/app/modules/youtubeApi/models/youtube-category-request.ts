export interface YoutubeCategoryRequest {
  key: string;
  part: string;
  // filters (one of should be used)
  regionCode?: string;
  id?: string;
  // the rest is optional
  hl?: string;
}
