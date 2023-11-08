export type { FeedItem, ServerData };

interface FeedItem {
    title: string;
    link: {
      href: string;
    };
    description: string;
    url: string;
    pubDate: string;
    pubished: string;
    items: any;
    content: string;
    readStatus: boolean;
    origcaption: string;
    image: Image;
    enclosure: any;
    [key: string]: any; //this is used to allow some strange properties like "media:group" and "media:description"
  }
  interface ServerData {
    feed?: {
      entry: FeedItem[];
    };
    rss?: {
      channel: {
        item: FeedItem[];
      };
    };
  }
  
  interface Image {
    title: string;
    url: string;
    link: string;
  }