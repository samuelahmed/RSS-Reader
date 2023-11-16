import FeedSourceSelector from "@/components/FeedSourceSelector";
import { useEffect } from "react";

export default function Sidebar({ setHeaderFeedInformation, setFeedURL, setIsMainFeedFocused, isMainFeedFocused, focusedComponent, setFocusedComponent }: any) {

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (!isMainFeedFocused) { // only handle keyboard events when Sidebar is focused
        
  //       // handle keyboard events...
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [isMainFeedFocused]);

  return (
    <aside className="w-6/12 md:w-2/12 border-r-white border-r-2 text-gray-200 ">
      <p className="text-center border-white border-y-2"> Feed Sources </p>
      <div className="max-h-screen overflow-auto scrollbar">
        <FeedSourceSelector
        setIsMainFeedFocused={setIsMainFeedFocused}
        isMainFeedFocused={isMainFeedFocused}

          setHeaderFeedInformation={setHeaderFeedInformation}
          setFeedURL={setFeedURL}
          // focusedComponent={focusedComponent}
          // setFocusedComponent={setFocusedComponent}
        
        />
      </div>
    </aside>
  );
}
