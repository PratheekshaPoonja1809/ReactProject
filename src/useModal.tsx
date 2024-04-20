import { useState } from "react";

export function useModal() {
  const [isOpen, setisOpen]: [boolean, (isOpen: boolean) => void] =
    useState<boolean>(false);

  const showModal = () => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    showModal,
  };
}
