import { render, screen, waitFor } from "@testing-library/react";
import { OompaLoompaDetail } from "./OompaLoompaDetail";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOompaLoompaDetailsIfNeeded } from "../../store/oompaLoompa/oompaLoompaThunks";

jest.mock("react-redux");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: 1 }),
}));
jest.mock("../../store/oompaLoompa/oompaLoompaThunks", () => ({
  fetchOompaLoompaDetailsIfNeeded: jest.fn(),
}));

describe("OompaLoompaDetail", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation((selector) =>
      selector({
        oompaLoompas: {
          details: {
            isLoading: false,
            error: null,
            data: {
              1: {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                gender: "M",
                profession: "Engineer",
                description: "Lorem ipsum dolor sit amet",
                image: "https://example.com/image.jpg",
                lastFetched: new Date(),
              },
            },
          },
        },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state when isLoading is true", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        oompaLoompas: {
          details: {
            isLoading: true,
            error: null,
            data: {},
          },
        },
      }),
    );

    render(<OompaLoompaDetail />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error message when error is present", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        oompaLoompas: {
          details: {
            isLoading: false,
            error: "Something went wrong",
            data: {},
          },
        },
      }),
    );

    render(<OompaLoompaDetail />);

    expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
  });

  test("renders 'No Oompa Loompa found' message when details is null", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        oompaLoompas: {
          details: {
            isLoading: false,
            error: null,
            data: {},
          },
        },
      }),
    );

    render(<OompaLoompaDetail />);

    expect(screen.getByText("No Oompa Loompa found")).toBeInTheDocument();
  });

  test("renders Oompa Loompa details when details is present", async () => {
    useParams.mockReturnValue({ id: 1 });

    render(<OompaLoompaDetail />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Man")).toBeInTheDocument();
      expect(screen.getByText("Engineer")).toBeInTheDocument();
      expect(
        screen.getByText("Lorem ipsum dolor sit amet"),
      ).toBeInTheDocument();
      expect(screen.getByAltText("John Doe")).toBeInTheDocument();
    });
  });
});
