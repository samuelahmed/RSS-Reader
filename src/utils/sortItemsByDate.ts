import { FeedItem } from "./types";

const sortItemsByDate = (a: FeedItem, b: FeedItem) =>
  new Date(b.published || b.pubDate).getTime() -
  new Date(a.published || a.pubDate).getTime();

export default sortItemsByDate;
