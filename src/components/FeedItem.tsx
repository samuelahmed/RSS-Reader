import { FeedItem } from "../utils/types";
import formatDate from "../utils/formatDate";

export default function FeedItemComponent({
  item,
  counter,
  setSelectedItem,
  setShowModal,
  setHoveredItem,
  focusedItem
}: {
  item: FeedItem;
  counter: number;
  setSelectedItem: Function;
  setShowModal: Function;
  setHoveredItem: Function;
  focusedItem: FeedItem | null;

}) {

  const isFocused = item === focusedItem;

  return (
    <div
      key={item.index}
      // onMouseEnter={() => setHoveredItem(item)}
      // onMouseLeave={() => setHoveredItem(null)}
      onClick={() => {
        setSelectedItem(item);
        setShowModal(true);
      }}
    >
            {/* hover:bg-blue-600 cursor-pointer */}

      {/* <p className="h-6 overflow-hidden 
      "> */}
            <p  className={isFocused ? 'focused bg-pink-700' : ''}
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
