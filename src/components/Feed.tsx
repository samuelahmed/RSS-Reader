/* eslint-disable @next/next/no-img-element */

import { FeedItem, ServerData } from "../utils/types";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function Feeds({ feedURL, setCurrentFeedInformation }: any) {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<FeedItem | null>(null);

  //get feed data from server
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getXML");
      if (!response.ok) {
        console.error("Failed to fetch XML data");
        return {};
      }
      const data = await response.json();
      if (data.feed) {
        data.feed.entry.sort(
          (
            a: { published: any; pubDate: any },
            b: { published: any; pubDate: any }
          ) =>
            new Date(b.published || b.pubDate).getTime() -
            new Date(a.published || a.pubDate).getTime()
        );
        setServerData({ feed: { entry: data.feed.entry } });
      } else if (data.rss) {
        if (Array.isArray(data.rss.channel.item)) {
          data.rss.channel.item.sort(
            (
              a: { published: any; pubDate: any },
              b: { published: any; pubDate: any }
            ) =>
              new Date(b.published || b.pubDate).getTime() -
              new Date(a.published || a.pubDate).getTime()
          );
        }
        setServerData({ rss: { channel: { item: data.rss.channel.item } } });
      }
    };
    fetchData();
  }, [feedURL]);

  //manage modal
  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (showModal && event.target === document.getElementById("modal")) {
        setShowModal(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (showModal && event.key === "Escape") {
        setShowModal(false);
      }
    };
    document.addEventListener("click", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [showModal]);

  //pass number of items in feed to header
  useEffect(() => {
    setCurrentFeedInformation((current: any) => ({
      ...current,
      numberOfItems: Math.max(
        serverData?.rss?.channel?.item?.length || 0,
        serverData?.feed?.entry?.length || 0
      ),
    }));
  }, [serverData]);

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

  //format date
  function formatDate(item: FeedItem) {
    const dateStr = item.published || item.pubDate;
    const date = new Date(dateStr);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  }

  //calculate how long ago the item was published
  function timeAgo(item: FeedItem) {
    const now = new Date();
    const publishedDate = new Date(item.published || item.pubDate);
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

  //get img url when imbeded in content
  const imgTag = selectedItem?.description?.match(
    /<img[^>]+src=(["']?)(.*?)\1/
  );
  const imgUrl = imgTag ? imgTag[2] : "";

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
        {/* Entry as feed */}
        {serverData?.feed?.entry
          ? serverData.feed.entry.map((item: FeedItem, counter: number) => (
              <div
                key={item.title}
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
                  {item.title}
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
                    key={item.title}
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
                      {item.title}
                    </p>
                  </div>
                )
              )
            : /* Entry as rss object */
              [serverData.rss.channel.item].map(
                (item: FeedItem, counter: number) => (
                  <div
                    key={item.title}
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
                      {item.title}
                    </p>
                  </div>
                )
              )
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
                <p className="text-center">{selectedItem.title}</p>

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
                    __html: DOMPurify.sanitize(selectedItem?.origcaption || ""),
                  }}
                ></p>
                <p
                  className="text-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(selectedItem?.description || ""),
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
                          alt={selectedItem.title}
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
                    className=" text-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        selectedItem["content:encoded"]
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
