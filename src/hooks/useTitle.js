import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `COUTURE CASTLE | ${title}`;
  }, [title]);
};
export default useTitle;
