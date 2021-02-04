import { createContainer } from "unstated-next";
import { PlatformContainer } from "./containers/PlatformContainer";
import { QuotesContainer } from "./containers/QuotesContainer";
import { useLog } from "../hooks/useLog";

const allContainers = [PlatformContainer, QuotesContainer];

const composeHooks = hooks => useLogger => () => {
  const reduced = hooks.reduce((acc, hook) => ({ ...acc, ...hook() }), {});
  Object.keys(reduced).filter(stateKey => {
    return stateKey.includes("State") && useLogger(stateKey, reduced[stateKey]);
  });
  return reduced;
};

const StoreContainer = createContainer(composeHooks(allContainers)(useLog));

export { StoreContainer };
