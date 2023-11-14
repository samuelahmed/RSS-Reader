import FeedSourceSelector from "@/components/FeedSourceSelector";

export default function Sidebar({ setHeaderFeedInformation, setFeedURL }: any) {
  return (
    <aside className="w-6/12 md:w-2/12 border-r-white border-r-2 text-gray-200 ">
      <p className="text-center border-white border-y-2"> Feed Sources </p>
      <div className="max-h-screen overflow-auto scrollbar">
        <FeedSourceSelector
          setHeaderFeedInformation={setHeaderFeedInformation}
          setFeedURL={setFeedURL}
        />
      </div>
    </aside>
  );
}
