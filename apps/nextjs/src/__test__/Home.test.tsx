// Home.test.tsx
import { render, screen } from "@testing-library/react";

import "./mocks"; // assuming your mocks are in the same directory
import Home from "../pages";

describe("Home", () => {
  it("renders correctly", () => {
    render(<Home />);
    expect(
      screen.getByText(
        "Projet de fin d&apos;études - École de Technologie Supérieur",
      ),
    ).toBeInTheDocument();
  });

  // Add more tests for different behaviors
});
