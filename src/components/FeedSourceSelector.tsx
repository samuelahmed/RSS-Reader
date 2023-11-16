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
  isMainFeedFocused
}: FeedSourceSelectorProps) {
  
  const [selectedItem, setSelectedItem] = useState("");
  const [focusedSourceIndex, setFocusedSourceIndex] = useState(0); // Add this line
  const feedDataArray = [
    { title: "News", data: newsFeedData },
    { title: "Tech", data: techFeedData },
    { title: "Dev", data: devFeedData },
    { title: "Youtube", data: youtubeFeedData },
    { title: "Podcast", data: podcastFeedData },
  ];


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault(); // prevent focus from moving to the next focusable element
        if (event.shiftKey) { // if Shift is also pressed
          setFocusedSourceIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // move to the previous feed
        } else {
          setFocusedSourceIndex((prevIndex) => Math.min(prevIndex + 1, feedDataArray.length - 1)); // move to the next feed
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedDataArray.length]);



  const handleFeedClick = async (newUrl: string, slug: string) => {
    setFeedURL(newUrl);
    setSelectedItem(slug);
  };


  return (
    <>
      {feedDataArray.map((feed, index) => (
        <div 
        tabIndex={0}
        onFocus={() => {
          setIsMainFeedFocused(false);
          setFocusedSourceIndex(index); // set focusedSourceIndex when this feed is focused
        }}



        // className={index === focusedSou  rceIndex ? 'focused bg-blue-300' : ''} 
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
            selectedItem={selectedItem}
            setHeaderFeedInformation={setHeaderFeedInformation}
            focusedSourceIndex={focusedSourceIndex} // pass focusedSourceIndex
            index={index} // pass index
          />
        </div>
      ))}
    </>
  );
}
