import React from "react";
import { render, screen } from "@testing-library/react";
import MainApp from "../App";
import { BrowserRouter } from "react-router-dom";
import store from "../Redux/redux-store.ts";
import { Provider } from "react-redux";


test("renders div with role main", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MainApp />
      </Provider>
    </BrowserRouter>
  );

  let div = screen.getByRole(/main/i);
  expect(div).toBeInTheDocument();
});
