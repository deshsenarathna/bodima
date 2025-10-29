const API_URL = 'http://localhost:8080/api/places';

// Your working createPlace: read once via res.text(), then attempt JSON.parse
export const createPlace = async (formData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData, // IMPORTANT: do NOT set Content-Type for FormData
  });

  const raw = await res.text(); // Read once

  if (!res.ok) {
    throw new Error(raw || 'Failed to create place');
  }

  try {
    return JSON.parse(raw); // Try parsing as JSON
  } catch {
    return raw; // Fallback to plain text
  }
};

// Helper to read once for GET/PUT/DELETE endpoints
async function readOnce(res) {
  const raw = await res.text();
  if (!res.ok) {
    throw new Error(raw || 'Request failed');
  }
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

// NEW: export listPlaces so SearchResult.jsx can import it
export const listPlaces = async () => {
  const res = await fetch(API_URL);
  const data = await readOnce(res);
  return Array.isArray(data) ? data : [];
};

// Optional: fetch a single place by id for the details page
export const getPlace = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await readOnce(res);
  return data || null;
};

// Optional helpers if you add these endpoints later:
export const updatePlace = async (id, jsonBody) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jsonBody),
  });
  return readOnce(res);
};

export const deletePlace = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  const data = await readOnce(res);
  return data;
};