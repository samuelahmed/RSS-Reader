import FeedSourceSelector from "@/components/FeedSourceSelector";

export default function Sidebar({
  setCurrentFeedInformation,
  setFeedURL,
}: any) {
  return (
    <aside className="w-6/12 md:w-2/12 border-r-white border-r-2 text-gray-200 ">
      <div className="h-full">
        <FeedSourceSelector
          setCurrentFeedInformation={setCurrentFeedInformation}
          setFeedURL={setFeedURL}
        />
      </div>
    </aside>
  );
}
