import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import { StoreContainer } from "../../store";

export function Navigator() {
  const { platformState, platformActions } = StoreContainer.useContainer();
  const { currentTab } = platformState;
  const { setCurrentTab } = platformActions;

  return (
    <Tabs
      value={currentTab}
      onChange={(event, newValue) => {
        setCurrentTab(newValue);
      }}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="Categories" icon={<CategoryIcon />} />
      <Tab label="Quotes" icon={<ChromeReaderModeIcon />} />
    </Tabs>
  );
}
