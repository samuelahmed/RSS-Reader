import Parser from "rss-parser";
import { useEffect, useState } from "react";
import { error } from "console";

export default function Feeds(feedURL: any) {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  interface FeedItem {
    title: string;
    link: string;
    description: string;
    url: string;
    date: string;

    // add any other properties you need here
  }

  useEffect(() => {
    const parser = new Parser();

    const fetchData = async () => {
      try {
        const feed = await parser.parseURL(feedURL.url);
        const items = feed.items.map((item) => ({
          title: item.title || "",
          link: item.link || "",
          description: item.description || "",
          url: item.url || "",
          date: item.pubDate || "",
        }));
        items.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setFeedItems(items);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };
    fetchData();
  }, [feedURL]);

  function formatDate(pubDate: any) {
    const date = new Date(pubDate);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  }

  return (
    <>
      <div
        className="flex-grow text-white px-1 overflow-auto"
        style={{ maxHeight: "calc(100vh - 3rem)" }}
      >
        {/* demo feed style */}
        {feedItems.map((item, counter) => (
          <p
            onClick={() => window.open(item.link, "_blank")}
            key={item.title}
            className="h-6 overflow-hidden hover:bg-blue-600 cursor-pointer"
          >
            <span className="text-white mr-2">{counter + 1}.</span>
            {formatDate(item.date)} - {item.title} - {item.description}
          </p>
        ))}

        <p className="h-6 overflow-hidden hover:bg-blue-600 cursor-pointer"></p>
      </div>
    </>
  );
}
