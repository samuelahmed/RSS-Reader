import { useState } from "react";
import newsFeedData from "../Feeds/newsFeedSources";
import youtubeFeedData from "../Feeds/youtubeFeedSources";
import podcastFeedData from "../Feeds/podcastFeedSources";

export default function MyFeeds({
  setFeedURL,
  setCurrentFeedInformation,
}: any) {
  const [selectedItem, setSelectedItem] = useState("");

  //Update the URL used to fetch the feed
  const handleFeedClick = async (newUrl: any, slug: string) => {
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
    }
  };

  return (
    <>
      {/* News Feed */}
      <div className="border-b-2 border-b-white border-r-white text-center">
        News Feeds
      </div>
      <div className="h-1/3 overflow-y-auto">
        {newsFeedData.map((feed) => (
          <div
            className={`h-6 w-full px-1 overflow-x-auto cursor-pointer ${
              feed.slug === selectedItem ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
            key={feed.slug}
            onClick={() => {
              handleFeedClick(feed.url, feed.slug);
              console.log(feed.title, "feed.title");
              setCurrentFeedInformation({ title: feed.title });
            }}
          >
            {feed.title}
          </div>
        ))}
      </div>

      {/* Youtube Feed */}
      <div className="border-y-2 border-y-white border-r-white text-center">
        Youtube Feeds
      </div>
      <div className="h-1/3 overflow-y-auto">
        {youtubeFeedData.map((feed) => (
          <div
            className={`h-6 w-full px-1 overflow-x-auto cursor-pointer ${
              feed.slug === selectedItem ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
            key={feed.slug}
            onClick={() => {
              handleFeedClick(feed.url, feed.slug);
              setCurrentFeedInformation({ title: feed.title });
            }}
          >
            {feed.title}
          </div>
        ))}
      </div>

      {/* Youtube Feed */}
      <div className="border-y-2 border-b-white border-r-white text-center">
        Podcast Feeds
      </div>
      <div className="h-1/3 overflow-y-auto">
        {podcastFeedData.map((feed) => (
          <div
            className={`h-6 w-full px-1 overflow-x-auto cursor-pointer ${
              feed.slug === selectedItem ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
            key={feed.slug}
            onClick={() => {
              handleFeedClick(feed.url, feed.slug);
              setCurrentFeedInformation({ title: feed.title });
            }}
          >
            {feed.title}
          </div>
        ))}
      </div>
    </>
  );
}
