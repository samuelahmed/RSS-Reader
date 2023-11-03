import NewsFeeds from "@/components/FeedSources";
import CommunityFeeds from "@/components/CommunityFeeds";

export default function Sidebar({ setFeedURL }: any) {
  return (
    <aside className="w-6/12 md:w-2/12 border-r-white border-r-2 text-white ">
      <div className="h-full">
        <NewsFeeds setFeedURL={setFeedURL} />
      </div>
    </aside>
  );
}
