import { useEffect } from "react";

export default function useFeedSourceSelectorKeyboardNav({
  setFocusedSourceIndex,
  feedDataArray,
  showModal,
  setSelectedSourceItem,
}: any) {
  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      if (showModal) {
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        if (event.shiftKey) {
          setFocusedSourceIndex((prevIndex: number) =>
            Math.max(prevIndex - 1, 0)
          );
        } else {
          setFocusedSourceIndex((prevIndex: number) =>
            Math.min(prevIndex + 1, feedDataArray.length - 1)
          );
        }
      }
      if (event.key === "ArrowLeft") {
        setSelectedSourceItem("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    return () => window.removeEventListener("keydown", handleKeyDown);
}, [feedDataArray.length, showModal, setFocusedSourceIndex, setSelectedSourceItem]);
}
