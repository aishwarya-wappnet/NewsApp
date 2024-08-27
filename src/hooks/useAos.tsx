import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const useAos = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
};

export default useAos;
