import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import store from "../../../Redux/redux-store";
import ProfileStatus from "../ProfileInfo/ProfileStatus";

describe("ProfileStatus component", () => {
  test("should be span, shouldn't input", () => {
    const component = create(
      <Provider store={store}>
        <ProfileStatus />
      </Provider>
    );
    const root = component.root;
    expect(() => {
      const input = root.findByType("input");
    }).toThrow();
  });
  test("input should be displayed in editMode", () => {
    const component = create(
      <Provider store={store}>
        <ProfileStatus />
      </Provider>
    );
    const root = component.root;
    const span = root.findByType("span");
    act(() => {
      span.props.onDoubleClick();
    });
    expect(() => {
      const span = root.findByType("span");
    }).toThrow();
  });
});
