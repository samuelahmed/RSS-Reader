import { useEffect } from "react";

export default function useScrollWithTab({ focusedItemIndex, itemRefs }: any) {

  useEffect(() => {
    const item = itemRefs.current.get(focusedItemIndex);
    if (item) {
      const scrollbar = document.querySelector(".scrollbar") as HTMLElement;
      const itemTop = item.getBoundingClientRect().top;
      const scrollbarTop = scrollbar?.getBoundingClientRect().top;

      if (
        itemTop < scrollbarTop ||
        itemTop > scrollbarTop + scrollbar?.offsetHeight
      ) {
        scrollbar.scrollTop = item.offsetTop - scrollbar.offsetTop;
      }
    }
  }, [focusedItemIndex, itemRefs]);
}
