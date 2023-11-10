export type { FeedItem, ServerData, FeedListProps, FeedSourceSelectorProps };

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

interface FeedListProps {
  feedData: Feed[];
  handleFeedClick: (newUrl: string, slug: string) => Promise<void>;
  selectedItem: string;
  setCurrentFeedInformation: (info: { title: string }) => void;
}

interface FeedSourceSelectorProps {
  setFeedURL: (newUrl: string) => void;
  setCurrentFeedInformation: (info: { title: string }) => void;
}

//not exported
interface Image {
  title: string;
  url: string;
  link: string;
}

interface Feed {
  url: string;
  slug: string;
  title: string;
}
