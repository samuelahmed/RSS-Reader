import NewsFeeds from "@/components/FeedSources";
import CommunityFeeds from "@/components/CommunityFeeds";

export default function Sidebar({
  setCurrentFeedInformation,
  setFeedURL,
}: any) {
  return (
    <aside className="w-6/12 md:w-2/12 border-r-white border-r-2 text-gray-200 ">
      <div className="h-full">
        <NewsFeeds
          setCurrentFeedInformation={setCurrentFeedInformation}
          setFeedURL={setFeedURL}
        />
      </div>
    </aside>
  );
}
