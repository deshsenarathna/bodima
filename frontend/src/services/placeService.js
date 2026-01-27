const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/places';

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

// List places (uses shared API_URL and readOnce helper)
export async function listPlaces(ownerEmail) {
  const url = ownerEmail
    ? `${API_URL}?ownerEmail=${encodeURIComponent(ownerEmail)}`
    : API_URL;

  const res = await fetch(url);
  // Use the shared readOnce helper so errors and JSON parsing are handled consistently
  return await readOnce(res);
}


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

 // ✅ Delete handler
 export async function deletePlace(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete place");
  return true;
}