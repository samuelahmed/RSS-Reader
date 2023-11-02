import feedData from "../Feeds/feedData";

export default function MyFeeds( {setFeedURL}: any ) {
  return (
    <>
      <div className="border-b-2 border-b-white border-r-white text-center">
        My Feeds
      </div>

      {/* My Feeds Container */}
      <div className="h-1/2 overflow-y-auto">
        {feedData.map((feed) => (
          <div
            className="h-6 w-full px-1 overflow-x-auto cursor-pointer hover:bg-blue-600"
            key={feed.slug}
            onClick={() => {
              // console.log(feed.url, 'feed.url')
              setFeedURL(feed.url);
            }}
          >
            {feed.title}
          </div>
        ))}
      </div>
    </>
  );
}
