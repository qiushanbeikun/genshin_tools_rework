import {useEffect, useRef} from "react";
import authSlice from "../../../store/slices/auth";

export function useIsMounted() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    }
  }, []);
  return mounted.current;
}
