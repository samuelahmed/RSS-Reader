import { useState } from "react";
import newsFeedData from "../feedSources/newsFeedSources";
import youtubeFeedData from "../feedSources/youtubeFeedSources";
import podcastFeedData from "../feedSources/podcastFeedSources";
import devFeedData from "../feedSources/devFeedSources";
import FeedList from "../components/Feedlist";
import { FeedSourceSelectorProps } from "../utils/types";

export default function FeedSourceSelector({
  setFeedURL,
  setCurrentFeedInformation,
}: FeedSourceSelectorProps) {
  const [selectedItem, setSelectedItem] = useState("");

  const handleFeedClick = async (newUrl: string, slug: string) => {
    setFeedURL(newUrl);
    setSelectedItem(slug);
  };

  const feedDataArray = [
    { title: "News", data: newsFeedData },
    { title: "Dev", data: devFeedData },
    { title: "Youtube", data: youtubeFeedData },
    { title: "Podcast", data: podcastFeedData },
  ];

  return (
    <>
      {feedDataArray.map((feed, index) => (
        <div className="" key={feed.title}>
          <div className={`text-center ${index === 0 ? 'border-b-2 border-b-white' : 'border-y-2 border-b-white border-r-white'}`}>
            {feed.title}
          </div>
          <FeedList
            feedData={feed.data}
            handleFeedClick={handleFeedClick}
            selectedItem={selectedItem}
            setCurrentFeedInformation={setCurrentFeedInformation}
          />
        </div>
      ))}
    </>
  );
}
