import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    position: "absolute",
    width: "100vw",
    left: "50%",
    right: " 50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
    top: "50%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

export function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
      <CircularProgress color="secondary" />
    </div>
  );
}
