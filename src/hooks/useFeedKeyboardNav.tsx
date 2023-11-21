import { useEffect } from "react";
import useAllItems from "./useAllItems";

export default function useFeedKeyboardNav({
  showModal,
  focusedItem,
  serverData,
  setSelectedItem,
  setShowModal,
  setFocusedItemIndex,
  setServerData,
  serverDataFromHook,
}: any) {
  const allItems = useAllItems(serverData);

  //Keyboard nav - press enter to open modal, up/down to navigate
  useEffect(() => {
    //don't allow keyboard nav if modal is open because the modal has its own keyboard nav and it will be annoying to return and have the selector in a different place
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showModal) {
        return;
      }

      //Do nothing if no feed is selected
      if (serverDataFromHook === null) {
        return;
      }

      if (event.key === "Enter" && focusedItem) {
        setSelectedItem(focusedItem);
        setShowModal(true);

      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusedItemIndex((prevIndex: number) => Math.max(prevIndex - 1, 0));

      } else if (event.key === "ArrowDown") {
        setFocusedItemIndex((prevIndex: number) => {
          event.preventDefault();
          let nextIndex = Math.min(prevIndex + 1, allItems.length - 1);
          return nextIndex;
        });

        //close current feed and go back to feedSelector with keyboard nav
      } else if (event.key === "ArrowLeft" && showModal === false) {
        setServerData(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    allItems.length,
    focusedItem,
    serverData,
    serverDataFromHook,
    setFocusedItemIndex,
    setSelectedItem,
    setServerData,
    setShowModal,
    showModal,
  ]);
}
