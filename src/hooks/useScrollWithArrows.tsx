import { useEffect } from "react";

export default function useScrollWithArrows({
  focusedItemIndex,
  itemRefs,
}: any) {
  
  useEffect(() => {
    const item = itemRefs.current.get(focusedItemIndex);
    if (item) {
      const sourceContainer = item.parentElement as HTMLElement;
      const itemTop = item.getBoundingClientRect().top;
      const sourceContainerTop = sourceContainer?.getBoundingClientRect().top;

      if (
        itemTop < sourceContainerTop ||
        itemTop > sourceContainerTop + sourceContainer?.offsetHeight
      ) {
        sourceContainer.scrollTop = item.offsetTop - sourceContainer.offsetTop;
      }
    }
  }, [focusedItemIndex, itemRefs]);
}
