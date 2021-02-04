import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export function StyledButton({
  children = "Click me",
  color = "primary",
  ...props
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color={color} {...props}>
        {children}
      </Button>
    </div>
  );
}
