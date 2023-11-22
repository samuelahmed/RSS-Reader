import { FeedItem } from "../utils/types";
import { useEffect, useState, useRef } from "react";
import useFeedData from "../hooks/useFeedData";
import useShowModal from "../hooks/useShowModal";
import useUpdateHeaderFeedInfo from "../hooks/useUpdateHeaderFeedInfo";
import FeedItemComponent from "@/components/FeedItem";
import DisplayModal from "./DisplayModal";
import useFeedKeyboardNav from "@/hooks/useFeedKeyboardNav";
import useAllItems from "@/hooks/useAllItems";

export default function Feed({
  feedURL,
  setHeaderFeedInformation,
  setIsMainFeedFocused,
  showModal,
  setShowModal,
}: any) {
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const [focusedItem, setFocusedItem] = useState<FeedItem | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);
  const serverDataFromHook = useFeedData(feedURL);
  const [serverData, setServerData] = useState(serverDataFromHook);
  const allItems = useAllItems(serverData);
  const itemRef = useRef<HTMLDivElement | null>(null);


  useUpdateHeaderFeedInfo(serverData, setHeaderFeedInformation);
  useShowModal(showModal, setShowModal);
  useFeedKeyboardNav({
    showModal,
    focusedItem,
    serverData,
    setSelectedItem,
    setShowModal,
    setFocusedItemIndex,
    setServerData,
    serverDataFromHook,
  });

  // Update serverData when serverDataFromHook changes
  useEffect(() => {
    setServerData(serverDataFromHook);
  }, [serverDataFromHook]);

  // Update focused item when focusedItemIndex changes
  useEffect(() => {
    setFocusedItem(allItems[focusedItemIndex] || null);
  }, [focusedItemIndex, serverData]);

  // Set the first item as the focused item when serverData changes
  useEffect(() => {
    setFocusedItem(allItems[0] || null);
    setFocusedItemIndex(0);
  }, [serverData]);


  // Scroll to item selected with keyboard nav
  // Bug: will get stuck under header if scrolling beyond screen and need fix with page refresh
  useEffect(() => {
    itemRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [focusedItemIndex]);

  return (
    <>
      <div
        tabIndex={showModal ? -1 : 0}
        onFocus={() => setIsMainFeedFocused(true)}
        className="h-screen flex-grow text-gray-200 px-1 overflow-auto scrollbar"
      >
        {/* Entry as ATOM feed */}
        {serverData?.feed?.entry
          ? serverData.feed.entry.map((item: FeedItem, counter: number) => (
              <FeedItemComponent
                key={item.index}
                item={item}
                counter={counter}
                setSelectedItem={setSelectedItem}
                setShowModal={setShowModal}
                focusedItem={focusedItem}
                ref={counter === focusedItemIndex ? itemRef : null}

              />
            ))
          : null}
        {/* Entry as RSS array */}
        {serverData?.rss?.channel?.item
          ? Array.isArray(serverData.rss.channel.item)
            ? serverData.rss.channel.item.map(
                (item: FeedItem, counter: number) => (
                  <FeedItemComponent
                    key={item.index}
                    item={item}
                    counter={counter}
                    setSelectedItem={setSelectedItem}
                    setShowModal={setShowModal}
                    focusedItem={focusedItem}
                    ref={counter === focusedItemIndex ? itemRef : null}

                  />
                )
              )
            : /* Entry as RSS object */
              [serverData.rss.channel.item].map(
                (item: FeedItem, counter: number) => (
                  <FeedItemComponent
                    key={item.index}
                    item={item}
                    counter={counter}
                    setSelectedItem={setSelectedItem}
                    setShowModal={setShowModal}
                    focusedItem={focusedItem}
                    ref={counter === focusedItemIndex ? itemRef : null}

                  />
                )
              )
          : null}
        {/* Entry as RDF array */}
        {serverData?.rdf?.item
          ? Array.isArray(serverData.rdf.item)
            ? serverData.rdf.item.map((item: FeedItem, counter: number) => (
                <FeedItemComponent
                  key={item.index}
                  item={item}
                  counter={counter}
                  setSelectedItem={setSelectedItem}
                  setShowModal={setShowModal}
                  focusedItem={focusedItem}
                  ref={counter === focusedItemIndex ? itemRef : null}

                />
              ))
            : /* Entry as RDF object */
              [serverData.rdf.item].map((item: FeedItem, counter: number) => (
                <FeedItemComponent
                  key={item.index}
                  item={item}
                  counter={counter}
                  setSelectedItem={setSelectedItem}
                  setShowModal={setShowModal}
                  focusedItem={focusedItem}
                  ref={counter === focusedItemIndex ? itemRef : null}

                />
              ))
          : null}
      </div>
      <DisplayModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedItem={selectedItem}
      />
    </>
  );
}
