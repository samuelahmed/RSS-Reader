import { useState } from "react";
import feedData from "../Feeds/feedData";

export default function MyFeeds({ setFeedURL }: any) {
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
      <div className="border-b-2 border-b-white border-r-white text-center">
        My Feeds
      </div>

      {/* My Feeds Container */}
      <div className="h-full overflow-y-auto">
        {feedData.map((feed) => (
          <div
            className={`h-6 w-full px-1 overflow-x-auto cursor-pointer ${
              feed.slug === selectedItem ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
            key={feed.slug}
            onClick={() => {
              handleFeedClick(feed.url, feed.slug);
            }}
          >
            {feed.title}
          </div>
        ))}
      </div>
    </>
  );
}
