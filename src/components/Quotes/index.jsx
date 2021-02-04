import React, { useEffect } from "react";
import {
  Fade,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  IconButton
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { StoreContainer } from "../../store";

const useStyles = makeStyles({
  fade: {
    margin: "0 0 1rem 0"
  },
  card: {
    minWidth: 275,
    minHeight: "100%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 0
  }
});

export function Quotes() {
  const {
    quoteState,
    quoteActions,
    platformActions
  } = StoreContainer.useContainer();
  const { currentQuote, currentCategory } = quoteState;
  const { getRandomQuote } = quoteActions;
  const { setIsLoading } = platformActions;

  const classes = useStyles();

  async function getData() {
    setIsLoading(true);
    getRandomQuote().then(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) getData();
    return () => {
      mounted = false;
    };
  }, []);

  const { value, url } = currentQuote || {};
  return (
    <Fade className={classes.fade} in={true} timeout={100}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            current category: {currentCategory}
          </Typography>
          <Typography variant="h5" component="h2">
            {value}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            share me
            <IconButton
              color="primary"
              size="small"
              onClick={() => window.open(url, "_blank")}
            >
              <ShareIcon />
            </IconButton>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => getData()}>
            Get another!
          </Button>
        </CardActions>
      </Card>
    </Fade>
  );
}
