import MyFeeds from "@/components/MyFeeds";
import CommunityFeeds from "@/components/CommunityFeeds";

export default function Sidebar({ setFeedURL }: any) {
  return (
    <aside className="w-6/12 md:w-2/12 border-r-white border-r-2 text-white ">
      <MyFeeds setFeedURL={setFeedURL} />
      {/* <CommunityFeeds /> hidden for now */}
    </aside>
  );
}
