import React, { useEffect, useState } from "react";
import Fade from "@material-ui/core/Fade";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  GridList
} from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { StoreContainer } from "../../store";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  gridList: {
    width: 500,
    height: "100%",
    padding: "1rem"
  }
});

export function Categories() {
  const {
    quoteState,
    quoteActions,
    platformState,
    platformActions
  } = StoreContainer.useContainer();
  const { categories, currentCategory } = quoteState;
  const { getCategories, setCurrentCategory } = quoteActions;
  const { isMobile, currentTab } = platformState;
  const { setIsLoading, setCurrentTab } = platformActions;

  const [slideEnd, setSlideEnd] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    function getData() {
      setIsLoading(true);
      getCategories().then(() => {
        setIsLoading(false);
      });
    }
    if (!categories && mounted) getData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Fade
      in={slideEnd}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 100, exit: 450 }}
    >
      <GridList
        cols={isMobile ? 1 : 2}
        cellHeight={60}
        className={classes.gridList}
      >
        {categories &&
          categories.map(category => (
            <ListItem
              key={category}
              name={category}
              button
              selected={currentCategory === category}
              onClick={event => {
                event.persist();
                const newCategory = event.target.textContent;
                setSlideEnd(false);
                setCurrentCategory(newCategory);
                setTimeout(() => {
                  setCurrentTab(currentTab + 1);
                }, 350);
              }}
            >
              <ListItemIcon>
                {currentCategory === category ? (
                  <ArrowRightIcon />
                ) : (
                  <ArrowLeftIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItem>
          ))}
      </GridList>
    </Fade>
  );
}
