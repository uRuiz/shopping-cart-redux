import { CONFIG } from "../config";

export const fetchOompaLoompasFromAPI = async (page = 1) => {
  const response = await fetch(`${CONFIG.API_BASE_URL}/?page=${page}`);
  if (!response.ok) {
    throw new Error(
      `API call for details failed with status: ${response.status}`,
    );
  }

  const { current, total, results } = await response.json();
  const hasMore = current < total;

  const oompaLoompas = results.map(({ first_name, last_name, ...rest }) => ({
    ...rest,
    firstName: first_name,
    lastName: last_name,
  }));

  return { items: oompaLoompas, hasMore };
};

export const fetchOompaLoompaDetailsFromAPI = async (id) => {
  const response = await fetch(`${CONFIG.API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(
      `API call for details failed with status: ${response.status}`,
    );
  }

  const details = await response.json();
  const { first_name, last_name, ...rest } = details;
  return {
    ...rest,
    firstName: first_name,
    lastName: last_name,
  };
};
