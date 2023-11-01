export default function MyFeeds() {
    return (
      <>
        <div className="border-b-2 border-b-white border-r-white text-center">My Feeds</div>
  
        {/* My Feeds Container */}
        <div className="h-1/2 overflow-y-auto">
        <div className="h-6 w-full px-1 overflow-x-auto cursor-pointer hover:bg-blue-600">
            source 1 is really really long
          </div>
          <div className="h-6 w-full px-1 overflow-x-auto cursor-pointer hover:bg-blue-600">
            source 2 is really really long really really really
          </div>
          <div className="h-6 w-full px-1 overflow-x-auto cursor-pointer hover:bg-blue-600 bg-blue-600">
            source 3 is selected
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