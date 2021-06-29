import { useEffect } from "react";

export default function usePreventScroll(dep: boolean) {
  useEffect(() => {
    if (dep) {
      document.querySelector("body").classList.add("prevent-scroll");
    } else {
      document.querySelector("body").classList.remove("prevent-scroll");
    }
  }, [dep]);
}
