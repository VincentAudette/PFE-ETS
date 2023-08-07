import { render, screen } from "./test.utils";
import LoadingPFE from "../components/LoadingPFE";

describe("LoadingPFE", () => {
  it("renders the loading animation and text", () => {
    render(<LoadingPFE />);
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
    expect(screen.getByText("Lottie Animation")).toBeInTheDocument();
  });
});
