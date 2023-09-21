import { render, screen } from "./test.utils";
import WelcomeSection from "../components/WelcomeSection";

describe("WelcomeSection", () => {
  it("renders the welcome section", () => {
    render(<WelcomeSection />);
    const title = screen.getByText(/Plateforme PFE dédiée aux/i);
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText(
        /Pour accéder à l'application, vous devez vous connecter avec votre compte ou en créer un./i,
      ),
    ).toBeInTheDocument();
  });
});
