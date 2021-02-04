import { useState } from "react";
import { StoreContainer } from "../";

const initialState = {
  categories: null,
  currentQuote: null,
  currentCategory: null
};

export function useResettableCounter() {
  const { platformState } = StoreContainer.useContainer();
  const { isLoading, currentTab } = platformState;

  return { isLoading, currentTab };
}

export function QuotesContainer() {
  const [state, setState] = useState(initialState);
  const quoteActions = {
    setCurrentCategory: category => {
      setState({
        ...state,
        currentCategory: category
      });
    },
    getRandomQuote: () => {
      const getData = new Promise((resolve, reject) => {
        fetch(
          `https://api.chucknorris.io/jokes/random?category=${
            state.currentCategory
          }`
        )
          .then(response => response.json())
          .then(data => {
            resolve(
              setState({
                ...state,
                currentQuote: data
              })
            );
          })
          .catch(err => {
            reject(err);
          });
        // resolve(
        //   setState({
        //     ...state,
        //     currentQuote: {
        //       categories: ["animal"],
        //       created_at: "2020-01-05 13:42:19.104863",
        //       icon_url:
        //         "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        //       id: "zjuwql5ns-mklqumqezlhg",
        //       updated_at: "2020-01-05 13:42:19.104863",
        //       url: "https://api.chucknorris.io/jokes/zjuwql5ns-mklqumqezlhg",
        //       value: "Chuck Norris can skeletize a cow in two minutes."
        //     }
        //   })
        // );
      });
      return getData;
    },
    getCategories: () => {
      const getData = new Promise((resolve, reject) => {
        fetch("https://api.chucknorris.io/jokes/categories")
          .then(response => response.json())
          .then(data => {
            resolve(
              setState({
                ...state,
                categories: data
              })
            );
          })
          .catch(err => {
            reject(err);
          });
        // resolve(
        //   setState({
        //     ...state,
        //     categories: [
        //       "animal",
        //       "career",
        //       "celebrity",
        //       "dev",
        //       "explicit",
        //       "fashion",
        //       "food",
        //       "history",
        //       "money",
        //       "movie",
        //       "music",
        //       "political",
        //       "religion",
        //       "science",
        //       "sport",
        //       "travel"
        //     ]
        //   })
        // );
      });
      return getData;
    }
  };

  return { quoteState: state, quoteActions };
}
