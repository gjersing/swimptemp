import "./mocks/matchMedia.mock";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Renders the App Header and waves", async () => {
  render(<App />);

  expect(screen.getByText("SAFE2SWIM"));
  expect(screen.getByText("Water Safety Calculator"));
  expect(screen.queryByText("Some random text")).toBeNull();

  expect(screen.getByTestId("waves_svg"));
});

test("Renders the form", async () => {
  render(<App />);

  expect(screen.getByText("Air Temperature"));
  expect(screen.getByText("air"));

  expect(screen.getByText("Water Temperature"));
  expect(screen.queryByText("water")).toBeNull;

  expect(screen.getByText("Wind & Rain"));
  expect(screen.queryByText("wind")).toBeNull;
  expect(screen.queryByText("rain")).toBeNull;

  await userEvent.click(screen.getByText("Next step"));

  expect(screen.getByText("Air Temperature"));
  expect(screen.queryByText("air")).toBeNull;
});
