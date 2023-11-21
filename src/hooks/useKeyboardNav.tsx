

import { useEffect } from "react";

export default function useKeyboardNav({showModal, focusedItem, serverData, setSelectedItem, setShowModal, setFocusedItemIndex, setServerData, serverDataFromHook}: any) {


  //Keyboard nav - press enter to open modal, up/down to navigate
  useEffect(() => {
    //don't allow keyboard nav if modal is open because the modal has its own keyboard nav and it will be annoying to return and have the selector in a different place
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showModal) {
        return;
      }

      //make sure the keyboard nav doesn't continue beyond the number of items
      const allItems =
        serverData?.feed?.entry ||
        serverData?.rss?.channel?.item ||
        serverData?.rdf?.item ||
        [];

      //Do nothing if no feed is selected
      if (serverDataFromHook === null) {
        return;
      }

      if (event.key === "Enter" && focusedItem) {
        setSelectedItem(focusedItem);
        setShowModal(true);
      } else if (event.key === "ArrowUp") {
        setFocusedItemIndex((prevIndex: number) => Math.max(prevIndex - 1, 0));
      } else if (event.key === "ArrowDown") {
        setFocusedItemIndex((prevIndex: number) => {
          let nextIndex = Math.min(prevIndex + 1, allItems.length - 1);

          //not sure what this was doing test a bit more before deleting
          // if (nextIndex > allItems.length - 1) {
          //   nextIndex = 0; // reset to the start
          // }

          return nextIndex;
        });

        //close current feed and go back to feedSelector with keyboard nav
      } else if (event.key === "ArrowLeft" && showModal === false) {
        setServerData(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedItem, serverData, showModal]);

}
