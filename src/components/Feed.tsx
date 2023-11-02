import { read } from "fs";
import { useEffect, useState } from "react";
import Link from "next/link"

interface FeedItem {
  title: string;
  link: string;
  description: string;
  url: string;
  pubDate: string;
  items: any;
  content: string;
  readStatus: boolean;
}
interface ServerData {
  items: FeedItem[];
}

export default function Feeds({ feedURL }: any) {
  const [serverData, setServerData] = useState<ServerData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getXML");
      const data = await response.json();
      console.log(data, "data");
      setServerData(data);
    };
    fetchData();
  }, []);

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
        {serverData?.items.map((item: FeedItem, counter: number) => (
          <Link 
          key={item.title}
          href={`/reader/${item.link}`}>
          <p
            className="h-6 overflow-hidden hover:bg-blue-600 cursor-pointer"
          >
            <span className="text-white mr-2">{counter + 1}.</span>
            <span className="text-white mr-2">
              {item.readStatus ? "✓" : "x"}
            </span>
            {formatDate(item.pubDate)} &nbsp;&nbsp;&nbsp;&nbsp; {item.title}
          </p>
          </Link>
        ))}

        <p className="h-6 overflow-hidden hover:bg-blue-600 cursor-pointer"></p>
      </div>
    </>
  );
}
