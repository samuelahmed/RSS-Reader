import { FeedItem } from "../utils/types";
import { useEffect, useState } from "react";
import useFeedData from "../hooks/useFeedData";
import useShowModal from "../hooks/useShowModal";
import useUpdateHeaderFeedInfo from "../hooks/useUpdateHeaderFeedInfo";
import FeedItemComponent from "@/components/FeedItem";
import DisplayModal from "./DisplayModal";

export default function Feed({ feedURL, setHeaderFeedInformation }: any) {
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<FeedItem | null>(null);
  const serverData = useFeedData(feedURL);
  const [showModal, setShowModal] = useShowModal(false);
  useUpdateHeaderFeedInfo(serverData, setHeaderFeedInformation);

  //Keyboard nav - press enter to open modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && hoveredItem) {
        setSelectedItem(hoveredItem);
        setShowModal(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hoveredItem]);

  return (
    <>
      <div className="h-screen flex-grow text-gray-200 px-1 overflow-auto scrollbar">
        {/* Entry as ATOM feed */}
        {serverData?.feed?.entry
          ? serverData.feed.entry.map((item: FeedItem, counter: number) => (
              <FeedItemComponent
                key={item.index}
                item={item}
                counter={counter}
                setSelectedItem={setSelectedItem}
                setShowModal={setShowModal}
                setHoveredItem={setHoveredItem}
              />
            ))
          : null}
        {/* Entry as RSS array */}
        {serverData?.rss?.channel?.item
          ? Array.isArray(serverData.rss.channel.item)
            ? serverData.rss.channel.item.map(
                (item: FeedItem, counter: number) => (
                  <FeedItemComponent
                    key={item.index}
                    item={item}
                    counter={counter}
                    setSelectedItem={setSelectedItem}
                    setShowModal={setShowModal}
                    setHoveredItem={setHoveredItem}
                  />
                )
              )
            : /* Entry as RSS object */
              [serverData.rss.channel.item].map(
                (item: FeedItem, counter: number) => (
                  <FeedItemComponent
                    key={item.index}
                    item={item}
                    counter={counter}
                    setSelectedItem={setSelectedItem}
                    setShowModal={setShowModal}
                    setHoveredItem={setHoveredItem}
                  />
                )
              )
          : null}
        {/* Entry as RDF array */}
        {serverData?.rdf?.item
          ? Array.isArray(serverData.rdf.item)
            ? serverData.rdf.item.map((item: FeedItem, counter: number) => (
                <FeedItemComponent
                  key={item.index}
                  item={item}
                  counter={counter}
                  setSelectedItem={setSelectedItem}
                  setShowModal={setShowModal}
                  setHoveredItem={setHoveredItem}
                />
              ))
            : /* Entry as RDF object */
              [serverData.rdf.item].map((item: FeedItem, counter: number) => (
                <FeedItemComponent
                  key={item.index}
                  item={item}
                  counter={counter}
                  setSelectedItem={setSelectedItem}
                  setShowModal={setShowModal}
                  setHoveredItem={setHoveredItem}
                />
              ))
          : null}
      </div>
      <DisplayModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedItem={selectedItem}
      />
    </>
  );
}
