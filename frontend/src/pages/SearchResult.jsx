import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { listPlaces } from "../services/placeService";
import { useAuth } from "../hooks/useAuth";

export default function SearchResults() {
  const user = useAuth();
  const myEmail = typeof user === "string" ? user : user?.email || "";

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    listPlaces()
      .then((data) => {
        if (!isMounted) return;
        setPlaces(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (!isMounted) return;
        setError(e.message || "Failed to load listings");
      })
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter to only show posts for the logged-in email (case-insensitive)
  const myPosts = useMemo(() => {
    if (!myEmail) return [];
    const me = myEmail.toLowerCase();
    return places.filter((p) => (p.ownerEmail || "").toLowerCase() === me);
  }, [places, myEmail]);

  if (!myEmail) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="text-gray-700 mb-3">
              Please log in to view your listings.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-8">Loading your listings...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">My Listings</h2>

        {myPosts.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
            You haven’t posted any listings yet.
            <div className="mt-4">
              <Link
                to="/add-place"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Make Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myPosts.map((place) => (
              <div
                key={place.id}
                className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={
                    (place.imageUrls && place.imageUrls[0]) ||
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