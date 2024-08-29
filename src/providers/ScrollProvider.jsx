import { useEffect } from "react";
import { useRouter } from "next/router";
import { useNavScrollTigger } from "../lib/store";

const triggerPoint = 50;

export default function ScrollProvider({ children }) {
  const router = useRouter();
  const { getIsNavScrollTrigger } = useNavScrollTigger();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= triggerPoint) {
        getIsNavScrollTrigger(true);
      } else {
        getIsNavScrollTrigger(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getIsNavScrollTrigger]);

  return children;
}
