import { FeedItem } from "../utils/types";
import formatDate from "../utils/formatDate";
import { forwardRef, useState, useEffect } from "react";

const FeedItemComponent = forwardRef(
  (
    {
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
    },
    ref: any
  ) => {
    const [keyboardNavUsed, setKeyboardNavUsed] = useState(false);
    
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          setKeyboardNavUsed(true);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    const isFocused = keyboardNavUsed && item === focusedItem;

    return (
      <div
        key={item.index}
        id={`item-${counter}`}
        ref={ref}
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
);

FeedItemComponent.displayName = "FeedItemComponent";

export default FeedItemComponent;
