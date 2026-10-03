import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map<string, number>();

const ScrollRestoration = () => {
  const location = useLocation();
  const navType = useNavigationType(); // "POP" = back/forward

  useEffect(() => {
    scrollPositions.set(location.key, window.scrollY);
  }, [location]);

  useEffect(() => {
    if (navType === "POP") {
      const saved = scrollPositions.get(location.key);
      window.scrollTo(0, saved ?? 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, navType]);

  return null;
};

export default ScrollRestoration;
