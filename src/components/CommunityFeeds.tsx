export default function CommunityFeeds() {
    return (
      <>
        <div className="border-y-2 border-b-white text-center">
          Community Feeds
        </div>
        <div className=" overflow-y-auto">
          <div className="h-6 w-full px-1 overflow-x-auto cursor-pointer hover:bg-blue-600">
            source 1 is really really long
          </div>
          <div className="h-6 w-full px-1 overflow-x-auto cursor-pointer hover:bg-blue-600">
            source 2 is really really long really really really and selcted
          </div>
          <div className="h-6 w-full px-1 overflow-x-auto cursor-pointer hover:bg-blue-600">
            source 3 is not selected
          </div>
          <div className="h-6 w-full px-1 overflow-x-auto cursor-pointer hover:bg-blue-600">
            source 1 is really really long
          </div>
          <div className="h-6 w-full px-1 overflow-x-auto cursor-pointer hover:bg-blue-600">
            source 1 is really really long
          </div>
        </div>
      </>
    );
  }