import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slice"
//console.log(counterReducer)
const store = configureStore({
    reducer: {
      theme:counterReducer
    },
  });

  export default store;
  