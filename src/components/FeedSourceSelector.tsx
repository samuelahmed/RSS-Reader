import { useState } from "react";
import newsFeedData from "../feedSources/newsFeedSources";
import youtubeFeedData from "../feedSources/youtubeFeedSources";
import podcastFeedData from "../feedSources/podcastFeedSources";
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
    { title: "News Feeds", data: newsFeedData },
    { title: "Youtube Feeds", data: youtubeFeedData },
    { title: "Podcast Feeds", data: podcastFeedData },
  ];

  return (
    <>
      {feedDataArray.map((feed) => (
        <div key={feed.title}>
          <div className="border-y-2 border-b-white border-r-white text-center">
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
