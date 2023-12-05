import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchOompaLoompasIfNeeded } from "./oompaLoompaThunks";
import { fetchOompaLoompasFromAPI } from "../../services/oompaLoompaService";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../services/oompaLoompaService", () => ({
  fetchOompaLoompasFromAPI: jest.fn(),
}));

describe("fetchOompaLoompasIfNeeded", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch Oompa Loompas if needed", async () => {
    const store = mockStore({
      oompaLoompas: {
        list: {
          lastUpdated: null,
          data: null,
          currentPage: 1,
          hasMore: true,
          isLoading: false,
        },
      },
    });

    const expectedResponse = {
      items: [
        { firstName: "John", lastName: "Doe", profession: "Developer" },
        { firstName: "Jane", lastName: "Smith", profession: "Designer" },
      ],
      hasMore: true,
    };

    fetchOompaLoompasFromAPI.mockResolvedValue(expectedResponse);

    await store.dispatch(fetchOompaLoompasIfNeeded());

    const actions = store.getActions();

    expect(actions[0].type).toEqual("oompaLoompas/fetchIfNeeded/pending");
  });

  it("should return existing data if not needed to fetch", async () => {
    const store = mockStore({
      oompaLoompas: {
        list: {
          lastUpdated: Date.now(),
          data: {
            items: [
              { firstName: "John", lastName: "Doe", profession: "Developer" },
              { firstName: "Jane", lastName: "Smith", profession: "Designer" },
            ],
            hasMore: false,
          },
          currentPage: 1,
          hasMore: false,
          isLoading: false,
        },
      },
    });

    const result = await store.dispatch(fetchOompaLoompasIfNeeded());

    const actions = store.getActions();
    expect(actions[0].type).toEqual("oompaLoompas/fetchIfNeeded/pending");
  });
});
