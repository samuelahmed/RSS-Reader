import { FeedItem } from './types';

 export default function formatDate(item: FeedItem) {
    const dateStr =
      item.published || item.pubDate || item.updated || item["dc:date"];
    const date = new Date(dateStr);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  }

