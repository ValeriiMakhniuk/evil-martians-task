import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("form", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("should be rendered", () => {
    const linkElement = screen.getByTestId("login-form");
    expect(linkElement).toBeInTheDocument();
  });

  test("email input should have inital focus", () => {
    const linkElement = screen.getByLabelText(/Email/i);
    expect(linkElement).toHaveFocus();
  });

  test("email input should be empty", () => {
    const linkElement = screen.getByLabelText(/Email/i);
    expect(linkElement).not.toHaveValue();
  });
});
