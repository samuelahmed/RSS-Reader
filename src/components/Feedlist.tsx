import { FeedListProps } from "../utils/types";
import { ReactNode, useRef, useEffect, useState } from "react";

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedSourceItem !== "") {
        return;
      }

      if (focusedSourceIndex === index) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setFocusedItemIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          setFocusedItemIndex((prevIndex) => {
            let nextIndex = Math.min(prevIndex + 1, feedData.length - 1);

            return nextIndex;
          });
        } else if (event.key === "Enter") {
          event.preventDefault();
          const currentFeed = feedData[focusedItemIndex];
          if (currentFeed) {
            handleFeedClick(currentFeed.url, currentFeed.slug);
            handleFeedSelect(currentFeed.url, currentFeed.slug);
            setHeaderFeedInformation({ title: currentFeed.title });
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    feedData,
    focusedSourceIndex,
    index,
    handleFeedSelect,
    setHeaderFeedInformation,
    focusedItemIndex,
    selectedSourceItem,
    handleFeedClick,
  ]);

  useEffect(() => {
    if (focusedSourceIndex === index) {
      setFocusedItemIndex(0);
    } else {
      setFocusedItemIndex(-1);
    }
  }, [focusedSourceIndex, index]);

  useEffect(() => {
    if (index !== lastSelectedSourceIndex) {
      setFocusedItemIndex(-1);
    }
  }, [index, lastSelectedSourceIndex]);

  // Scroll with tab without moving the entire page
  // Bug: title will get stuck under "Feed Sources" if tabbing to bottom and back up - fixed with page refresh
  useEffect(() => {
    const item = itemRefs.current.get(focusedItemIndex);
    if (item) {
      const scrollbar = document.querySelector(".scrollbar") as HTMLElement;
      const itemTop = item.getBoundingClientRect().top;
      const scrollbarTop = scrollbar?.getBoundingClientRect().top;

      if (
        itemTop < scrollbarTop ||
        itemTop > scrollbarTop + scrollbar?.offsetHeight
      ) {
        scrollbar.scrollTop = item.offsetTop - scrollbar.offsetTop;
      }
    }
  }, [focusedItemIndex]);

  // Scroll with arrow keys without moving the entire page
  useEffect(() => {
    const item = itemRefs.current.get(focusedItemIndex);
    if (item) {
      const sourceContainer = item.parentElement as HTMLElement;
      const itemTop = item.getBoundingClientRect().top;
      const sourceContainerTop = sourceContainer?.getBoundingClientRect().top;

      if (
        itemTop < sourceContainerTop ||
        itemTop > sourceContainerTop + sourceContainer?.offsetHeight
      ) {
        sourceContainer.scrollTop = item.offsetTop - sourceContainer.offsetTop;
      }
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
