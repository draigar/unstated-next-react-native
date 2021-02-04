import { useState, useEffect } from "react";
import isMobile from "ismobilejs";

const width = 768;
const customAgent = global.navigator.userAgent;
const initialState = {
  isLoading: false,
  isMobile:
    global.window.innerWidth <= width ||
    isMobile(customAgent).phone ||
    isMobile(customAgent).tablet,
  currentTab: 0
};

export function PlatformContainer() {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    function handleResize() {
      if (
        global.window.innerWidth <= width ||
        isMobile(customAgent).phone ||
        isMobile(customAgent).tablet
      ) {
        if (!state.isMobile) {
          setState({
            ...state,
            isMobile: true
          });
        }
      } else if (state.isMobile) {
        setState({
          ...state,
          isMobile: false
        });
      }
    }

    global.window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      global.window.removeEventListener("resize", handleResize);
    };
  });

  const platformActions = {
    setIsLoading: isLoading => {
      setState({
        ...state,
        isLoading
      });
    },
    setCurrentTab: tab => {
      setState({
        ...state,
        currentTab: tab
      });
    }
  };

  return { platformState: state, platformActions };
}
