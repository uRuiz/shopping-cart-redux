import { CONFIG } from "../config";
import { fetchOompaLoompasFromAPI } from "./oompaLoompaService";

describe("fetchOompaLoompasFromAPI", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            current: 1,
            total: 2,
            results: [
              {
                first_name: "John",
                last_name: "Doe",
                profession: "Developer",
              },
              {
                first_name: "Jane",
                last_name: "Smith",
                profession: "Designer",
              },
            ],
          }),
      }),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches Oompa Loompas from the API with the correct page parameter", async () => {
    const page = 1;
    await fetchOompaLoompasFromAPI(page);

    expect(global.fetch).toHaveBeenCalledWith(
      `${CONFIG.API_BASE_URL}/?page=${page}`,
    );
  });

  it("returns the correct data structure with mapped properties", async () => {
    const page = 1;
    const expectedData = {
      items: [
        { firstName: "John", lastName: "Doe", profession: "Developer" },
        { firstName: "Jane", lastName: "Smith", profession: "Designer" },
      ],
      hasMore: true,
    };

    const result = await fetchOompaLoompasFromAPI(page);

    expect(result).toEqual(expectedData);
  });

  it("throws an error if the API call fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      }),
    );

    await expect(fetchOompaLoompasFromAPI()).rejects.toThrow(
      "API call for details failed with status: 500",
    );
  });
});
