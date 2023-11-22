// useFeedRender.tsx
import { FeedItem } from "../utils/types";
import FeedItemComponent from "@/components/FeedItem";

export default function useFeedRender(
  serverData: any,
  setSelectedItem: Function,
  setShowModal: Function,
  focusedItem: FeedItem | null,
  itemRef: React.RefObject<HTMLDivElement>,
  focusedItemIndex: number
) {
  function renderFeedItems(items: FeedItem[] | FeedItem) {
    // If items is not an array, convert it to an array
    const itemsArray = Array.isArray(items) ? items : [items];

    return itemsArray.map((item: FeedItem, counter: number) => (
      <FeedItemComponent
        key={item.index}
        item={item}
        counter={counter}
        setSelectedItem={setSelectedItem}
        setShowModal={setShowModal}
        focusedItem={focusedItem}
        ref={counter === focusedItemIndex ? itemRef : null}
      />
    ));
  }

  const feedItems = {
    atom: serverData?.feed?.entry && renderFeedItems(serverData.feed.entry),
    rss: serverData?.rss?.channel?.item && renderFeedItems(serverData.rss.channel.item),
    rdf: serverData?.rdf?.item && renderFeedItems(serverData.rdf.item),
  };

  return feedItems;
}