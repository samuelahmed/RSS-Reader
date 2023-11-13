import { FeedListProps } from "../utils/types";
import { ReactNode } from "react";

export default function FeedList({
  feedData,
  handleFeedClick,
  selectedItem,
  setCurrentFeedInformation,
}: FeedListProps): ReactNode {
  
  return (
    <div className="max-h-52 overflow-auto">
      {feedData.map((feed) => (
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
  );
}
