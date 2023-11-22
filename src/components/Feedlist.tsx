import { FeedListProps } from "../utils/types";
import { ReactNode, useRef, useEffect, useState } from "react";
import useFeedListKeyboardNav from "@/hooks/useFeedListKeyboardNav";
import useScrollWithTab from "@/hooks/useScrollWithTab";
import useScrollWithArrows from "@/hooks/useScrollWithArrows";

export default function FeedList({
  feedData,
  handleFeedClick,
  selectedSourceItem,
  setHeaderFeedInformation,
  focusedSourceIndex,
  handleFeedSelect,
  index,
  lastSelectedSourceIndex,
  setLastSelectedSourceIndex,
}: FeedListProps): ReactNode {
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);
  const itemRefs = useRef(new Map<number, HTMLElement>());

  //Navigate within each feed-source with keyboard
  useFeedListKeyboardNav({
    feedData,
    focusedSourceIndex,
    index,
    handleFeedSelect,
    setHeaderFeedInformation,
    focusedItemIndex,
    selectedSourceItem,
    handleFeedClick,
    setFocusedItemIndex,
  });

  // Scroll with tab without moving the entire page
  // Bug: title will get stuck under "Feed Sources" if tabbing to bottom and back up - fixed with page refresh
  useScrollWithTab({ focusedItemIndex, itemRefs });

  // Scroll with arrow keys without moving the entire page
  useScrollWithArrows({ focusedItemIndex, itemRefs });

  // Set focus on first item when feed-source is focused
  // Also reset focus when another feed-source is focused
  useEffect(() => {
    if (focusedSourceIndex === index) {
      setFocusedItemIndex(0);
    } else {
      setFocusedItemIndex(-1);
    }
  }, [focusedSourceIndex, index]);

  // Reset focus when another feed-source is selected
  // Useful when using keyboard and mouse to navigate
  useEffect(() => {
    if (index !== lastSelectedSourceIndex) {
      setFocusedItemIndex(-1);
    }
  }, [index, lastSelectedSourceIndex]);

  return (
    <div className="max-h-52 overflow-auto scrollbar">
      {feedData.map((feed, index) => (
        <div
          ref={(el) => {
            if (el) {
              itemRefs.current.set(index, el);
            }
          }}
          className={`h-6 w-full px-1 overflow-x-auto scrollbar cursor-pointer ${
            index === focusedItemIndex
              ? //when 'focused' or selected with keyboard
                "bg-blue-600"
              : feed.slug === selectedSourceItem
              ? //when selected with mouse
                "bg-blue-600"
              : //when hover with mouse
                "hover:bg-blue-600"
          }`}
          key={feed.slug}
          onClick={() => {
            handleFeedClick(feed.url, feed.slug);
            setHeaderFeedInformation({ title: feed.title });
            setFocusedItemIndex(-1);
            setLastSelectedSourceIndex(index);
          }}
        >
          {feed.title}
        </div>
      ))}
    </div>
  );
}
