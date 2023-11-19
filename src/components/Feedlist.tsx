import { FeedListProps } from "../utils/types";
import { ReactNode, useRef, useEffect, useState } from "react";

export default function FeedList({
  feedData,
  handleFeedClick,
  selectedSourceItem,
  setHeaderFeedInformation,
  focusedSourceIndex,
  handleFeedSelect, // add this
  index,
  lastSelectedSourceIndex,
  setLastSelectedSourceIndex, // add this



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
            if (nextIndex > feedData.length - 1) {
              nextIndex = 0; // reset to the start
            }
            return nextIndex;
          });
        } else if (event.key === "Enter") {
          event.preventDefault();
          const currentFeed = feedData[focusedItemIndex];
          if (currentFeed) {
            console.log("currentFeed.url:", currentFeed.url); // log the URL
            handleFeedClick(currentFeed.url, currentFeed.slug);
            handleFeedSelect(currentFeed.url, currentFeed.slug); // call handleFeedSelect with currentFeed.url
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
    // handleFeedClick,
    handleFeedSelect,
    setHeaderFeedInformation,
    focusedItemIndex,
  ]);

  useEffect(() => {
    console.log("focusedItemIndex:", focusedItemIndex); // log the focusedItemIndex
    console.log("focusedSourceIndex:", focusedSourceIndex); // log the focusedSourceIndex
  }, [focusedItemIndex]);

  useEffect(() => {
    if (focusedSourceIndex === index) {
      setFocusedItemIndex(0);
    } else {
      setFocusedItemIndex(-1);
    }
  }, [focusedSourceIndex, index]);


  useEffect(() => {
    if (index !== lastSelectedSourceIndex) {
      setFocusedItemIndex(-1); // Reset focusedItemIndex if the current feed list is not the last selected one
    }
  }, [lastSelectedSourceIndex]);

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
              //when 'focused' or selected with keyboard
              ? "bg-blue-600"
              : feed.slug === selectedSourceItem
              //when selected with mouse
              ? "bg-blue-600"
              //when hover with mouse
              : "hover:bg-blue-600"
          }`}
          key={feed.slug}
          onClick={() => {
            handleFeedClick(feed.url, feed.slug);
            setHeaderFeedInformation({ title: feed.title });
            setFocusedItemIndex(-1); // Reset focusedItemIndex when a mouse click occurs
            setLastSelectedSourceIndex(index); // Update lastSelectedSourceIndex when a mouse click occurs

          }}
        >
          {feed.title}
        </div>
      ))}
    </div>
  );
}
