import { useState, useEffect } from "react";

export default function useShowModal(initialState: boolean) {

  const [showModal, setShowModal] = useState(initialState);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (showModal && event.target === document.getElementById("modal")) {
        setShowModal(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (showModal && event.key === "Escape") {
        setShowModal(false);
      }
    };
    document.addEventListener("click", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [showModal]);

  return [showModal, setShowModal] as const;
}
