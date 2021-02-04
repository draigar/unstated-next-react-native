import React from "react";
import { render } from "react-dom";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { StoreContainer } from "./store";
import { Navigator } from "./components/Navigator";
import { TabSelector } from "./components/TabSelector";
import { Loading } from "./components/Loading";
import { useResettableCounter } from "./store/containers/QuotesContainer";

const useStyles = makeStyles({
  root: {
    overflow: "hidden"
  }
});

function ChuckNavigation() {
  const { platformState } = StoreContainer.useContainer();
  const { isLoading, currentTab } = platformState;

  const { isLoading: Sasa } = useResettableCounter();

  console.log("Sasa", Sasa);

  const classes = useStyles(currentTab);

  return (
    <Paper className={classes.root} elevation={1}>
      {isLoading && <Loading />}
      <Grid container direction="column" justify="center" alignItems="center">
        <Navigator />
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <TabSelector />
      </Grid>
    </Paper>
  );
}

function App() {
  return (
    <div>
      <StoreContainer.Provider>
        <ChuckNavigation />
      </StoreContainer.Provider>
    </div>
  );
}

render(<App />, document.getElementById("root"));
