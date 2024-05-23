import axios from 'axios';

const API_URL = 'https://openlibrary.org/search.json';

export const fetchBooks = async (query) => {
  try {
    const response = await axios.get(`${API_URL}?q=${encodeURIComponent(query)}`);
    const filterDocs = response.data.docs.filter(doc => doc !== undefined);
    return filterDocs;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw error;
  }
};
