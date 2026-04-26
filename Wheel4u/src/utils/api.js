const DEFAULT_API_BASE_URL = 'http://localhost/Wheel4u_api';

export const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/+$/, '');

export const apiUrl = (path) =>
  `${API_BASE_URL}/${path.replace(/^\/+/, '')}`;

export const parseJsonResponse = async (response) => {
  const rawText = await response.text();

  if (!rawText) {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}.`);
    }

    return {};
  }

  let data;

  try {
    data = JSON.parse(rawText);
  } catch (error) {
    throw new Error(
      'The backend did not return valid JSON. Make sure the PHP API is running and not printing warnings or HTML errors.'
    );
  }

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}.`);
  }

  return data;
};
