import ReactPlayer from "react-player";
import Link from "next/link";
import DOMPurify from "dompurify";
import formatDate from "@/utils/formatDate";
import timeAgo from "@/utils/timeSincePublished";
import { createImageLoaderSet, checkIfContainsImage } from "@/utils/imageTools";
import { ModalProps } from "@/utils/types";

export default function DisplayModal({
  showModal,
  setShowModal,
  selectedItem,
}: ModalProps) {
  const imgLoaderSet = createImageLoaderSet(selectedItem);

  const containsImage = checkIfContainsImage(
    selectedItem?.["content:encoded"] || "",
    Array.from(imgLoaderSet)
  );

  return (
    <>
      {showModal && selectedItem ? (
        <>
          <div
            id="modal"
            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="shadow-lg relative flex flex-col w-full h-full bg-[rgb(26,26,26)] border-white border-2 text-gray-200 outline-none focus:outline-none overflow-auto scrollbar p-2"
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
                      //regEx to format descriptions
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
                    ) //regEx to add spacing between paragraphs
                      .replace(/<p>/g, "<p>")
                      .replace(/<\/p>/g, "</p><br>"),
                  }}
                ></p>
                {/* Image */}
                {!containsImage &&
                  Array.from(imgLoaderSet).map(
                    (url) =>
                      url && (
                        // eslint-disable-next-line @next/next/no-img-element
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
                          //regEx to add spacing between paragraphs
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
