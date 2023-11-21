import { useState } from "react";
import newsFeedData from "../feedSources/newsFeedSources";
import youtubeFeedData from "../feedSources/youtubeFeedSources";
import podcastFeedData from "../feedSources/podcastFeedSources";
import devFeedData from "../feedSources/devFeedSources";
import techFeedData from "../feedSources/techFeedSources";
import FeedList from "../components/Feedlist";
import { FeedSourceSelectorProps } from "../utils/types";
import { useEffect } from "react";

export default function FeedSourceSelector({
  setFeedURL,
  setHeaderFeedInformation,
  setIsMainFeedFocused,
  showModal,
}: FeedSourceSelectorProps & { showModal: boolean }) {
  const [selectedSourceItem, setSelectedSourceItem] = useState("");
  const [focusedSourceIndex, setFocusedSourceIndex] = useState(0); 
  const [lastSelectedSourceIndex, setLastSelectedSourceIndex] = useState(0); 

  // console.log(selectedSourceItem, "selectedSourceItem")
  
  const feedDataArray = [
    { title: "News", data: newsFeedData },
    { title: "Tech", data: techFeedData },
    { title: "Dev", data: devFeedData },
    { title: "Youtube", data: youtubeFeedData },
    { title: "Podcast", data: podcastFeedData },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showModal) {
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        if (event.shiftKey) {
          setFocusedSourceIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else {
          setFocusedSourceIndex((prevIndex) =>
            Math.min(prevIndex + 1, feedDataArray.length - 1)
          );
        }
      }
      if (event.key === "ArrowLeft") {
        setSelectedSourceItem("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedDataArray.length, showModal]);

  const handleFeedClick = async (newUrl: string, slug: string) => {
    setFeedURL(newUrl);
    setSelectedSourceItem(slug);
    setLastSelectedSourceIndex(focusedSourceIndex); 
  };

  const handleFeedSelect = (newUrl: string, slug: string) => {
    setFeedURL(newUrl);
    setSelectedSourceItem(slug);
    setLastSelectedSourceIndex(focusedSourceIndex);
  };

  useEffect(() => {
    if (selectedSourceItem) {
      setFeedURL(selectedSourceItem);
    }
  }, [selectedSourceItem]);

  return (
    <>
      {feedDataArray.map((feed, index) => (
        <div
          onFocus={() => {
            setIsMainFeedFocused(false);
            setFocusedSourceIndex(index); 
          }}
          key={feed.title}
        >
          <div
            className={`text-center ${
              index === 0
                ? "border-b-2 border-b-white"
                : "border-y-2 border-b-white border-r-white"
            }`}
          >
            {feed.title}
          </div>
          <FeedList
            feedData={feed.data}
            handleFeedClick={handleFeedClick}
            selectedSourceItem={selectedSourceItem}
            setHeaderFeedInformation={setHeaderFeedInformation}
            focusedSourceIndex={focusedSourceIndex} 
            index={index}
            handleFeedSelect={handleFeedSelect}
            lastSelectedSourceIndex={lastSelectedSourceIndex} 
            setLastSelectedSourceIndex={setLastSelectedSourceIndex}
          />
        </div>
      ))}
    </>
  );
}
