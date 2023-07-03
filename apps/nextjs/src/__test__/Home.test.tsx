// Home.test.tsx
import { screen } from "@testing-library/react";
import { render } from "./test.utils";

import "./mocks"; // assuming your mocks are in the same directory
import Home from "../pages";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Home", () => {
  it("renders the home page", () => {
    render(<Home />);
    expect(
      screen.getByText(
        "Projet de fin d'études à l'École de Technologie Supérieure",
      ),
    ).toBeInTheDocument();
  });
});
