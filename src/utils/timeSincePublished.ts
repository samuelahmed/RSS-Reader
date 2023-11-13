import { FeedItem } from './types';

 export default function timeAgo(item: FeedItem) {
    const now = new Date();
    const publishedDate = new Date(
      item.published || item.pubDate || item.updated || item["dc:date"]
    );
    const diffInSeconds = Math.abs(
      (now.getTime() - publishedDate.getTime()) / 1000
    );
    const units = [
      { name: "year", seconds: 60 * 60 * 24 * 365 },
      { name: "month", seconds: 60 * 60 * 24 * 30 },
      { name: "day", seconds: 60 * 60 * 24 },
      { name: "hour", seconds: 60 * 60 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];
    for (let unit of units) {
      if (diffInSeconds >= unit.seconds) {
        const amount = Math.floor(diffInSeconds / unit.seconds);
        return `${amount} ${unit.name}${amount > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }
