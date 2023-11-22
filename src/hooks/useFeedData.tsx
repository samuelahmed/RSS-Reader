import { useState, useEffect } from "react";
import { ServerData } from "../utils/types";
import sortItemsByDate from "@/utils/sortItemsByDate";

export default function useFeedData(feedURL: string) {
    
  const [serverData, setServerData] = useState<ServerData | null>(null);
  
  useEffect(() => {

    // Fetch the XML data from the server
    const fetchData = async () => {
      const response = await fetch(
        `/api/getXML?feedUrl=${encodeURIComponent(feedURL)}`
      );
      if (!response.ok) {
        console.error("Failed to fetch XML data");
        setServerData(null);
        return;
      }
      const data = await response.json();

      // If the feed is an Atom feed
      if (data.feed) {
        data.feed.entry.sort(sortItemsByDate);
        setServerData({ feed: { entry: data.feed.entry } });

        // If the feed is an RSS feed
      } else if (data.rss) {
        if (Array.isArray(data.rss.channel.item)) {
          data.rss.channel.item.sort(sortItemsByDate);
        }
        setServerData({ rss: { channel: { item: data.rss.channel.item } } });

        // If the feed is an RDF feed
      } else if (data["rdf:RDF"]) {
        const items = data["rdf:RDF"].item;
        if (Array.isArray(items)) {
          items.sort(sortItemsByDate);
        }
        setServerData({ rdf: { item: items } });
      }
    };

    // Fetch the data when the feedURL changes
    fetchData();
  }, [feedURL]);

  return serverData;
}
