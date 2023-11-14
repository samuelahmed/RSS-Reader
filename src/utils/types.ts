export type { FeedItem, ServerData, FeedListProps, FeedSourceSelectorProps, ModalProps };

//for components/Feed.tsx
interface FeedItem {
  title: {
    _: string;
    type: string;
  };
  link: {
    href: string;
  };
  description: string | { _: string; type?: string };
  url: string;
  pubDate: string;
  pubished: string;
  items: any;
  content: string | { _: string; type?: string };
  readStatus: boolean;
  origcaption: string;
  image: Image;
  enclosure: any;
  [key: string]: any; //this is used to allow some strange properties like "media:group" and "media:description"
}
//for components/Feed.tsx
interface ServerData {
  feed?: {
    entry: FeedItem[];
  };
  rss?: {
    channel: {
      item: FeedItem[];
    };
  };
  rdf?: {
    item: FeedItem[];
  };
}

//for components/FeedList.tsx
interface FeedListProps {
  feedData: Feed[];
  handleFeedClick: (newUrl: string, slug: string) => Promise<void>;
  selectedItem: string;
  setHeaderFeedInformation: (info: { title: string }) => void;
}

//for components/FeedSourceSelector.tsx
interface FeedSourceSelectorProps {
  setFeedURL: (newUrl: string) => void;
  setHeaderFeedInformation: (info: { title: string }) => void;
}

//for components/DisplayModal.tsx
interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedItem: FeedItem | null;
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
