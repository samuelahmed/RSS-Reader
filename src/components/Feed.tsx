/* eslint-disable @next/next/no-img-element */

import { FeedItem, ServerData } from "../utils/types";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import DOMPurify from "dompurify";
import useFeedData from "../hooks/useFeedData";
import useShowModal from "../hooks/useShowModal";
import useUpdateHeaderFeedInfo from "../hooks/useUpdateHeaderFeedInfo";
import formatDate from "@/utils/formatDate";

export default function Feed({
  feedURL,
  setHeaderFeedInformation,
}: any) {
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



  //calculate how long ago the item was published
  function timeAgo(item: FeedItem) {
    const now = new Date();
    const publishedDate = new Date(
      item.published || item.pubDate || item.updated || item["dc:date"]
    );
    const diffInSeconds = Math.abs(
      (now.getTime() - publishedDate.getTime()) / 1000
    );
    const units = [
      { name: "year", seconds: 60 * 60 * 24 * 365 },
      { name: "month", seconds: 60 * 60 * 24 * 30 },
      { name: "day", seconds: 60 * 60 * 24 },
      { name: "hour", seconds: 60 * 60 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];
    for (let unit of units) {
      if (diffInSeconds >= unit.seconds) {
        const amount = Math.floor(diffInSeconds / unit.seconds);
        return `${amount} ${unit.name}${amount > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }
  //create set of possible image urls so the image is not rendered twice by image loader
  const imgLoaderSet = new Set([
    selectedItem?.enclosure?.url,
    selectedItem?.["media:content"]?.url,
    selectedItem?.image?.url,
  ]);

  //check if html content contains any of the image urls already in the image loader set to avoid duplicates with image loader and content loader
  function containsImage(htmlContent: string, imageUrls: string[]): boolean {
    return imageUrls.some((url) => htmlContent.includes(url));
  }

  return (
    <>
      <div className="h-screen flex-grow text-gray-200 px-1 overflow-auto">
        {/* Entry as ATOM feed */}
        {serverData?.feed?.entry
          ? serverData.feed.entry.map((item: FeedItem, counter: number) => (
              <div
                key={item.index}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
              >
                <p className="h-6 overflow-hidden hover:bg-blue-600 cursor-pointer">
                  <span className="text-gray-200 mr-2">{counter + 1}.</span>
                  <span className="hidden md:inline">
                    {formatDate(item)} &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  {typeof item.title === "string" ? item.title : item.title._}{" "}
                </p>
              </div>
            ))
          : null}

        {/* Entry as rss array */}
        {serverData?.rss?.channel?.item
          ? Array.isArray(serverData.rss.channel.item)
            ? serverData.rss.channel.item.map(
                (item: FeedItem, counter: number) => (
                  <div
                    key={item.index}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      setSelectedItem(item);
                      setShowModal(true);
                    }}
                  >
                    <p className="h-6 overflow-hidden hover:bg-blue-600 cursor-pointer">
                      <span className="text-gray-200 mr-2">{counter + 1}.</span>
                      <span className="hidden md:inline">
                        {formatDate(item)} &nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      {item && item.title && typeof item.title === "string"
                        ? item.title
                        : item?.title?._}{" "}
                    </p>
                  </div>
                )
              )
            : /* Entry as rss object */
              [serverData.rss.channel.item].map(
                (item: FeedItem, counter: number) => (
                  <div
                    key={item.index}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      setSelectedItem(item);
                      setShowModal(true);
                    }}
                  >
                    <p className="h-6 overflow-hidden hover:bg-blue-600 cursor-pointer">
                      <span className="text-gray-200 mr-2">{counter + 1}.</span>
                      <span className="hidden md:inline">
                        {formatDate(item)} &nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      {item && item.title && typeof item.title === "string"
                        ? item.title
                        : item?.title?._}{" "}
                      {/* Change this line */}
                    </p>
                  </div>
                )
              )
          : null}
        {/* Entry as RDF feed */}
        {serverData?.rdf?.item
          ? Array.isArray(serverData.rdf.item)
            ? serverData.rdf.item.map((item: FeedItem, counter: number) => (
                <div
                  key={item.index}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    setSelectedItem(item);
                    setShowModal(true);
                  }}
                >
                  <p className="h-6 overflow-hidden hover:bg-blue-600 cursor-pointer">
                    <span className="text-gray-200 mr-2">{counter + 1}.</span>
                    <span className="hidden md:inline">
                      {formatDate(item)} &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    {item && item.title && typeof item.title === "string"
                      ? item.title
                      : item?.title?._}{" "}
                  </p>
                </div>
              ))
            : /* Entry as RDF object */
              [serverData.rdf.item].map((item: FeedItem, counter: number) => (
                <div
                  key={item.index}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    setSelectedItem(item);
                    setShowModal(true);
                  }}
                >
                  <p className="h-6 overflow-hidden hover:bg-blue-600 cursor-pointer">
                    <span className="text-gray-200 mr-2">{counter + 1}.</span>
                    <span className="hidden md:inline">
                      {formatDate(item)} &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    {item && item.title && typeof item.title === "string"
                      ? item.title
                      : item?.title?._}{" "}
                  </p>
                </div>
              ))
          : null}
      </div>
      {showModal && selectedItem ? (
        <>
          <div
            id="modal"
            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="shadow-lg relative flex flex-col w-full h-full bg-[rgb(26,26,26)] border-white border-2 text-gray-200 outline-none focus:outline-none overflow-auto p-2"
            >
              {/* modal content */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute right-0 px-2"
                >
                  close [esc]
                </button>

                {/* Date & Title */}
                <p>
                  {formatDate(selectedItem)} - {timeAgo(selectedItem)}
                </p>
                <p className="text-center">
                  {selectedItem &&
                  selectedItem.title &&
                  typeof selectedItem.title === "string"
                    ? selectedItem.title
                    : selectedItem?.title?._}
                </p>
                {/* Read more */}
                {selectedItem?.link?.href ? (
                  <Link
                    className="text-blue-500"
                    href={selectedItem?.link?.href}
                    target="_blank"
                  >
                    Read more
                  </Link>
                ) : (
                  selectedItem?.link && (
                    <Link
                      className="text-blue-500"
                      href={selectedItem?.link}
                      target="_blank"
                    >
                      Read more
                    </Link>
                  )
                )}

                {/* Description */}
                <p
                  className="text-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      selectedItem?.["media:group"]?.["media:description"] || ""
                    )
                      //regEx to format youtube vid descriptions
                      .replace(/\n/g, "<br>"),
                  }}
                ></p>
                <p
                  className="text-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      typeof selectedItem?.content === "string"
                        ? selectedItem?.content
                        : selectedItem?.content?._ || ""
                    )
                      //messy regEx to format descriptions
                      .replace(/\n\n/g, "<br>")
                      .replace(/\n/g, " "),
                  }}
                ></p>

                <p
                  className="text-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      typeof selectedItem?.summary === "string"
                        ? selectedItem?.summary
                        : selectedItem?.summary?._ || ""
                    ),
                  }}
                ></p>
                <p
                  className="text-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      typeof selectedItem?.description === "string"
                        ? selectedItem?.description
                        : selectedItem?.description?._ || ""
                    ) //regEx add spacing between paragraphs
                      .replace(/<p>/g, "<p>")
                      .replace(/<\/p>/g, "</p><br>"),
                  }}
                ></p>

                {/* Image */}
                {!containsImage(
                  selectedItem?.["content:encoded"] || "",
                  Array.from(imgLoaderSet)
                ) &&
                  Array.from(imgLoaderSet).map(
                    (url) =>
                      url && (
                        <img
                          key={url}
                          src={url}
                          alt={
                            typeof selectedItem.title === "string"
                              ? selectedItem.title
                              : selectedItem.title._
                          }
                          className="w-full h-auto"
                        />
                      )
                  )}

                {/* Media */}
                {selectedItem?.link?.href && (
                  <ReactPlayer controls={true} url={selectedItem?.link?.href} />
                )}
                {selectedItem?.["media:group"]?.link?.href && (
                  <ReactPlayer
                    controls={true}
                    url={selectedItem?.["media:group"]?.link?.href}
                  />
                )}
                {selectedItem?.enclosure?.url && (
                  <ReactPlayer
                    controls={true}
                    url={selectedItem?.enclosure?.url}
                  />
                )}

                {/* Content */}
                {selectedItem?.["content:encoded"] && (
                  <div
                    className="text-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        selectedItem["content:encoded"]
                          //regEx add spacing between paragraphs
                          .replace(/<p>/g, "<p>")
                          .replace(/<\/p>/g, "</p><br>")
                      ),
                    }}
                  />
                )}

                {/* Comments  */}
                {selectedItem?.comments && (
                  <a
                    className="text-blue-500"
                    href={selectedItem.comments}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View comments
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
