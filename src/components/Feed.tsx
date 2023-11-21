import { FeedItem } from "../utils/types";
import { useEffect, useState } from "react";
import useFeedData from "../hooks/useFeedData";
import useShowModal from "../hooks/useShowModal";
import useUpdateHeaderFeedInfo from "../hooks/useUpdateHeaderFeedInfo";
import FeedItemComponent from "@/components/FeedItem";
import DisplayModal from "./DisplayModal";
import useKeyboardNav from "@/hooks/useKeyboardNav";

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

  useUpdateHeaderFeedInfo(serverData, setHeaderFeedInformation);
  useShowModal(showModal, setShowModal);
  useKeyboardNav({
    showModal,
    focusedItem,
    serverData,
    setSelectedItem,
    setShowModal,
    setFocusedItemIndex,
    setServerData,
    serverDataFromHook
});

  // Update serverData when serverDataFromHook changes
  useEffect(() => {
    setServerData(serverDataFromHook);
  }, [serverDataFromHook]);

  // //Keyboard nav - press enter to open modal, up/down to navigate
  // useEffect(() => {
  //   //don't allow keyboard nav if modal is open because the modal has its own keyboard nav and it will be annoying to return and have the selector in a different place
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (showModal) {
  //       return;
  //     }

  //     //make sure the keyboard nav doesn't continue beyond the number of items
  //     const allItems =
  //       serverData?.feed?.entry ||
  //       serverData?.rss?.channel?.item ||
  //       serverData?.rdf?.item ||
  //       [];

  //     //Do nothing if no feed is selected
  //     if (serverDataFromHook === null) {
  //       return;
  //     }

  //     if (event.key === "Enter" && focusedItem) {
  //       setSelectedItem(focusedItem);
  //       setShowModal(true);
  //     } else if (event.key === "ArrowUp") {
  //       setFocusedItemIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  //     } else if (event.key === "ArrowDown") {
  //       setFocusedItemIndex((prevIndex) => {
  //         let nextIndex = Math.min(prevIndex + 1, allItems.length - 1);

  //         //not sure what this was doing test a bit more before deleting
  //         // if (nextIndex > allItems.length - 1) {
  //         //   nextIndex = 0; // reset to the start
  //         // }

  //         return nextIndex;
  //       });

  //       //close current feed and go back to feedSelector with keyboard nav
  //     } else if (event.key === "ArrowLeft" && showModal === false) {
  //       setServerData(null);
  //     }
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [focusedItem, serverData, showModal]);

  // Update focused item when focusedItemIndex changes
  useEffect(() => {
    const allItems =
      serverData?.feed?.entry ||
      serverData?.rss?.channel?.item ||
      serverData?.rdf?.item ||
      [];
    setFocusedItem(allItems[focusedItemIndex] || null);
  }, [focusedItemIndex, serverData]);

  // Set the first item as the focused item when serverData changes
  useEffect(() => {
    const allItems =
      serverData?.feed?.entry ||
      serverData?.rss?.channel?.item ||
      serverData?.rdf?.item ||
      [];
    setFocusedItem(allItems[0] || null);
    setFocusedItemIndex(0);
  }, [serverData]);

  // Scroll to item selected with keyboard nav
  useEffect(() => {
    if (focusedItemIndex >= 5) {
      const itemElement = document.getElementById(`item-${focusedItemIndex}`);
      itemElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
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
