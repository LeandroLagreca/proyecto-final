import { configureStore } from "@reduxjs/toolkit";

import user from "./reducers/user";
import videoGames from "./reducers/videoGame";

export const store = configureStore({
  reducer: {
    videoGames,
    user
  },
});
