import {
  fetchOompaLoompasIfNeeded,
  fetchOompaLoompaDetailsIfNeeded,
} from "./oompaLoompaThunks";
import oompaLoompasReducer from "./slice";

describe("oompaLoompasSlice", () => {
  const initialState = {
    list: {
      isLoading: false,
      data: [],
      error: null,
      lastUpdated: null,
      currentPage: 1,
      hasMore: true,
    },
    details: {
      isLoading: false,
      data: [],
      error: null,
      lastUpdated: {},
    },
  };

  it("should handle fetchOompaLoompasIfNeeded.pending", () => {
    const nextState = oompaLoompasReducer(
      initialState,
      fetchOompaLoompasIfNeeded.pending(),
    );
    expect(nextState.list.isLoading).toBe(true);
    expect(nextState.list.error).toBeNull();
  });

  it("should handle fetchOompaLoompasIfNeeded.fulfilled", () => {
    const payload = {
      items: [{ id: 1, name: "Oompa Loompa 1" }],
      hasMore: false,
    };
    const nextState = oompaLoompasReducer(
      initialState,
      fetchOompaLoompasIfNeeded.fulfilled(payload),
    );
    expect(nextState.list.isLoading).toBe(false);
    expect(nextState.list.data).toEqual(payload.items);
    expect(nextState.list.currentPage).toBe(2);
    expect(nextState.list.hasMore).toBe(false);
    expect(nextState.list.lastUpdated).not.toBeNull();
    expect(nextState.list.error).toBeNull();
  });

  it("should handle fetchOompaLoompasIfNeeded.rejected", () => {
    const error = "Failed to fetch Oompa Loompas";
    const nextState = oompaLoompasReducer(
      initialState,
      fetchOompaLoompasIfNeeded.rejected(error),
    );
    expect(nextState.list.isLoading).toBe(false);
    expect(nextState.list.error).toBe(error);
  });

  it("should handle fetchOompaLoompaDetailsIfNeeded.pending", () => {
    const nextState = oompaLoompasReducer(
      initialState,
      fetchOompaLoompaDetailsIfNeeded.pending(),
    );
    expect(nextState.details.isLoading).toBe(true);
    expect(nextState.details.error).toBeNull();
  });

  it("should handle fetchOompaLoompaDetailsIfNeeded.rejected", () => {
    const error = "Failed to fetch Oompa Loompa details";
    const nextState = oompaLoompasReducer(
      initialState,
      fetchOompaLoompaDetailsIfNeeded.rejected(error),
    );
    expect(nextState.details.isLoading).toBe(false);
    expect(nextState.details.error).toBe(error);
  });
});
