import { FeedItem } from "../utils/types";
import formatDate from "../utils/formatDate";

export default function FeedItemComponent({
  item,
  counter,
  setSelectedItem,
  setShowModal,
  setHoveredItem,
}: {
  item: FeedItem;
  counter: number;
  setSelectedItem: Function;
  setShowModal: Function;
  setHoveredItem: Function;
}) {
  return (
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
        {typeof item.title === "string" ? item.title : item.title?._}{" "}
      </p>
    </div>
  );
}
