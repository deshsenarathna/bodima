import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listPlaces } from "../services/placeService";
import { resolveImageUrl } from "../utils/imageURL.JS";
import { useAuth} from "../hooks/useAuth.js";

export default function SearchResults() {
  const user = useAuth();
  const myEmail = ((typeof user === "string" ? user : user?.email) || "")
    .trim()
    .toLowerCase();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Get search query parameters from URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchCity = (params.get("city") || "").trim().toLowerCase();
  const searchPeople = Number(params.get("people") || 1);

  // ✅ Fetch all places once
  useEffect(() => {
  if (!myEmail) return;
  let alive = true;
  setLoading(true);
  listPlaces(myEmail)
    .then((data) => alive && setPlaces(Array.isArray(data) ? data : []))
    .catch((e) => alive && setError(e.message || "Failed to load listings"))
    .finally(() => alive && setLoading(false));
  return () => { alive = false; };
}, [myEmail]);


  // ✅ Normalize image URLs and other fields
  const normalized = useMemo(() => {
    return (places || []).map((p) => {
      const first =
        p.imageUrls?.[0] ??
        p.images?.[0]?.url ??
        "";
      return { ...p, firstImageUrl: resolveImageUrl(first) };
    });
  }, [places]);

  // ✅ Filter based on city and capacity
  const filteredPlaces = useMemo(() => {
    let results = normalized;

    if (searchCity) {
      results = results.filter((p) =>
        (p.city || "").toLowerCase().includes(searchCity)
      );
    }

    if (searchPeople > 0) {
      results = results.filter(
        (p) => Number(p.capacity || 0) >= searchPeople
      );
    }

    return results;
  }, [normalized, searchCity, searchPeople]);

  // ✅ Loading & Error handling
  if (loading) return <div className="p-8">Loading listings...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  // ✅ Render filtered listings
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          {searchCity
            ? `Places in ${searchCity.charAt(0).toUpperCase() + searchCity.slice(1)}`
            : "All Places"}
        </h2>

        {filteredPlaces.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
            No listings found for your search.
            <div className="mt-4">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Go Back Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={
                    place.firstImageUrl ||
                    "https://via.placeholder.com/800x450?text=No+Image"
                  }
                  alt={place.title}
                  className="rounded-xl mb-4 w-full h-40 object-cover"
                />
                <h3 className="font-bold text-lg">{place.title}</h3>
                <p className="text-gray-600">{place.city}</p>
                <p className="text-sm text-gray-500">
                  Capacity: {place.capacity}
                </p>
                <p className="mt-1 font-semibold text-blue-600">
                  Rs {Number(place.pricePerMonth || 0).toLocaleString()}/month
                </p>
                <Link
                  to={`/listing/${place.id}`}
                  className="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
