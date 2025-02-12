import { useState, useEffect } from "react";

const useScreenWidth = (breakpoint = 1024) => {
  const [isWider, setIsWider] = useState(
    typeof window !== "undefined" ? window.innerWidth > breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsWider(window.innerWidth > breakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isWider;
};

export default useScreenWidth;
