import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders the App Header and waves", () => {
  render(<App />);

  expect(screen.getByText("SAFE2SWIM"));
  expect(screen.getByText("Water Safety Calculator"));
  expect(screen.queryByText("Some random text")).toBeNull();

  expect(screen.getByTestId("waves_svg"));
});
