import { FeedItem } from "../utils/types";
import { useEffect, useState, useRef } from "react";
import useShowModal from "../hooks/useShowModal";
import useUpdateHeaderFeedInfo from "../hooks/useUpdateHeaderFeedInfo";
import DisplayModal from "./DisplayModal";
import useFeedKeyboardNav from "@/hooks/useFeedKeyboardNav";
import useFeedItems from "@/hooks/useFeedItems";
import useFeedRender from "@/hooks/useFeedRender";

export default function Feed({
  feedURL,
  setHeaderFeedInformation,
  setIsMainFeedFocused,
  showModal,
  setShowModal,
}: any) {

  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);

  const {
    focusedItem,
    focusedItemIndex,
    setFocusedItemIndex,
    serverData,
    setServerData,
  } = useFeedItems(feedURL);

  const feedItems = useFeedRender(
    serverData,
    setSelectedItem,
    setShowModal,
    focusedItem,
    itemRef,
    focusedItemIndex
  );

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
  });

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
        {feedItems.atom}
        {feedItems.rss}
        {feedItems.rdf}
      </div>
      <DisplayModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedItem={selectedItem}
      />
    </>
  );
}
