import { FeedItem } from "../utils/types";
import { useEffect, useState } from "react";
import useFeedData from "../hooks/useFeedData";
import useShowModal from "../hooks/useShowModal";
import useUpdateHeaderFeedInfo from "../hooks/useUpdateHeaderFeedInfo";
import FeedItemComponent from "@/components/FeedItem";
import DisplayModal from "./DisplayModal";

export default function Feed({ feedURL, setHeaderFeedInformation, setIsMainFeedFocused }: any) {
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<FeedItem | null>(null);
  const [focusedItem, setFocusedItem] = useState<FeedItem | null>(null);

  const serverData = useFeedData(feedURL);
  const [showModal, setShowModal] = useShowModal(false);
  useUpdateHeaderFeedInfo(serverData, setHeaderFeedInformation);


  
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);





  //Keyboard nav - press enter to open modal, up/down to navigate
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && focusedItem) {
        setSelectedItem(focusedItem);
        setShowModal(true);
      } else if (event.key === "ArrowUp") {
        setFocusedItemIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (event.key === "ArrowDown") {
        setFocusedItemIndex((prevIndex) => prevIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedItem]);

  // Update focused item when focusedItemIndex changes
  useEffect(() => {
    const allItems = serverData?.feed?.entry || serverData?.rss?.channel?.item || serverData?.rdf?.item || [];
    setFocusedItem(allItems[focusedItemIndex] || null);
  }, [focusedItemIndex, serverData]);

  // Set the first item as the focused item when serverData changes
  useEffect(() => {
    const allItems = serverData?.feed?.entry || serverData?.rss?.channel?.item || serverData?.rdf?.item || [];
    setFocusedItem(allItems[0] || null);
    setFocusedItemIndex(0);
  }, [serverData]);

  


  return (
    <>
      <div 
      tabIndex={0} onFocus={() => setIsMainFeedFocused(true)}
      className="h-screen flex-grow text-gray-200 px-1 overflow-auto scrollbar">
        {/* Entry as ATOM feed */}
        {serverData?.feed?.entry
          ? serverData.feed.entry.map((item: FeedItem, counter: number) => (
              <FeedItemComponent
                key={item.index}
                item={item}
                counter={counter}
                setSelectedItem={setSelectedItem}
                setShowModal={setShowModal}
                setHoveredItem={setHoveredItem}
                focusedItem={focusedItem}

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
                    setHoveredItem={setHoveredItem}
                    focusedItem={focusedItem}

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
                    setHoveredItem={setHoveredItem}
                    focusedItem={focusedItem}

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
                  setHoveredItem={setHoveredItem}
                  focusedItem={focusedItem}

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
                  setHoveredItem={setHoveredItem}
                  focusedItem={focusedItem}

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