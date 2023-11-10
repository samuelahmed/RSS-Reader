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
  const [error, setError] = useState<string | null>(null);

  const handleFeedClick = async (newUrl: string, slug: string) => {
    try {
      const response = await fetch("/api/getXML", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: newUrl }),
      });
      if (response.ok) {
        setFeedURL(newUrl);
        setSelectedItem(slug);
      } else {
        throw new Error("Failed to update URL");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const feedDataArray = [
    { title: "News Feeds", data: newsFeedData },
    { title: "Youtube Feeds", data: youtubeFeedData },
    { title: "Podcast Feeds", data: podcastFeedData },
  ];

  return (
    <>
      {error && <div className="error">{error}</div>}
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
