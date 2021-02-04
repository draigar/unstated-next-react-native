import React from "react";
import { Categories } from "../Categories";
import { Quotes } from "../Quotes";
import { StoreContainer } from "../../store";

export function TabSelector() {
  const { platformState } = StoreContainer.useContainer();
  const { currentTab } = platformState;
  const AvailableTabs = [<Categories />, <Quotes />];

  return AvailableTabs[currentTab];
}
