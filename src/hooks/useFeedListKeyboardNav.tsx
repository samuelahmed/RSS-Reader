import { useEffect } from "react";

export default function useFeedListKeyboardNav({
  feedData,
  focusedSourceIndex,
  index,
  handleFeedSelect,
  setHeaderFeedInformation,
  focusedItemIndex,
  selectedSourceItem,
  handleFeedClick,
  setFocusedItemIndex,
}: any) {
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedSourceItem !== "") {
        return;
      }

      if (focusedSourceIndex === index) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setFocusedItemIndex((prevIndex: number) =>
            Math.max(prevIndex - 1, 0)
          );
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          setFocusedItemIndex((prevIndex: number) => {
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
    setFocusedItemIndex,
  ]);
}
