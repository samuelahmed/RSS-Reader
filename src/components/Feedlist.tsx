import { FeedListProps } from "../utils/types";
import { ReactNode, useRef, useEffect, useState } from "react";

export default function FeedList({
  feedData,
  handleFeedClick,
  selectedItem,
  setHeaderFeedInformation,
  focusedSourceIndex,
  index,
}: FeedListProps): ReactNode {
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);
  const itemRefs = useRef(new Map<number, HTMLElement>());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (focusedSourceIndex === index) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setFocusedItemIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          setFocusedItemIndex((prevIndex) => {
            let nextIndex = Math.min(prevIndex + 1, feedData.length - 1);
            if (nextIndex > feedData.length - 1) {
              // corrected condition
              nextIndex = 0; // reset to the start
            }
            return nextIndex;
          });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedData.length, focusedSourceIndex, index]);

  useEffect(() => {
    if (focusedSourceIndex === index) {
      setFocusedItemIndex(0);
    } else {
      setFocusedItemIndex(-1);
    }
  }, [focusedSourceIndex, index]);

  useEffect(() => {
    const item = itemRefs.current.get(focusedItemIndex);
    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedItemIndex]);

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
              ? "bg-blue-600"
              : feed.slug === selectedItem
              ? "bg-blue-600"
              : "hover:bg-blue-600"
          }`}
          key={feed.slug}
          onClick={() => {
            handleFeedClick(feed.url, feed.slug);
            setHeaderFeedInformation({ title: feed.title });
          }}
        >
          {feed.title}
        </div>
      ))}
    </div>
  );
}
