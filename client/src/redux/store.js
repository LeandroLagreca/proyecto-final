import { configureStore } from "@reduxjs/toolkit";

import user from "./reducers/user";
import videogames from "./reducers/videoGame";

export const store = configureStore({
  reducer: {
    videogames,
    user
  },
});
