import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header", () => {
  test("renders header icon and title", () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    const headerIcon = screen.getByTestId("header-icon");
    const headerTitle = screen.getByText("Oompa Loompa's Crew");

    expect(headerIcon).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
  });
});
