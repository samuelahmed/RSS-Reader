import { FeedItem } from "../utils/types";
import formatDate from "../utils/formatDate";

export default function FeedItemComponent({
  item,
  counter,
  setSelectedItem,
  setShowModal,
  focusedItem,
}: {
  item: FeedItem;
  counter: number;
  setSelectedItem: Function;
  setShowModal: Function;
  focusedItem: FeedItem | null;
}) {
  
  const isFocused = item === focusedItem;

  return (
    <div
      key={item.index}
      id={`item-${counter}`}
      onClick={() => {
        setSelectedItem(item);
        setShowModal(true);
      }}
    >
      <p
        className={
          isFocused
            ? "focused bg-blue-600 overflow-hidden h-6"
            : "hover:bg-blue-600 cursor-pointer overflow-hidden h-6"
        }
      >
        <span className="text-gray-200 mr-2">{counter + 1}.</span>
        <span className="hidden md:inline">
          {formatDate(item)} &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {typeof item.title === "string" ? item.title : item.title?._}{" "}
      </p>
    </div>
  );
}
