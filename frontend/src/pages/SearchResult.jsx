import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listPlaces,deletePlace } from "../services/placeService";
import { resolveImageUrl } from "../utils/imageURL.JS";
import { useAuth } from "../hooks/useAuth.js";
import { Edit, Trash2, Eye, MapPin, Users, DollarSign, Star } from "lucide-react"; // ✅ Icon imports


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
    let alive = true;
    setLoading(true);
    listPlaces()
      .then((data) => alive && setPlaces(Array.isArray(data) ? data : []))
      .catch((e) => alive && setError(e.message || "Failed to load listings"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  // ✅ Normalize image URLs and other fields
  const normalized = useMemo(() => {
    return (places || []).map((p) => {
      const first = p.imageUrls?.[0] ?? p.images?.[0]?.url ?? "";
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
      results = results.filter((p) => Number(p.capacity || 0) >= searchPeople);
    }

    return results;
  }, [normalized, searchCity, searchPeople]);

   const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePlace(id); // ← calling backend from service
      setPlaces((prev) => prev.filter((p) => p.id !== id)); // update UI
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

 

  // ✅ Loading & Error handling
  if (loading) return <div className="p-8">Loading listings...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  // ✅ Render filtered listings
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {searchCity
              ? `Boarding Places in ${
                  searchCity.charAt(0).toUpperCase() + searchCity.slice(1)
                }`
              : "All Boarding Places"}
          </h1>
          <p className="text-blue-100 text-lg">
            {filteredPlaces.length} {filteredPlaces.length === 1 ? "listing" : "listings"} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredPlaces.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-slate-50 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or explore all available places.</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="group bg-slate-50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full border border-gray-200"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-200 h-48">
                  <img
                    src={
                      place.firstImageUrl ||
                      "https://via.placeholder.com/800x450?text=No+Image"
                    }
                    alt={place.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <DollarSign size={14} />
                    Rs {Number(place.pricePerMonth || 0).toLocaleString()}
                    <span className="text-xs text-blue-100">/mo</span>
                  </div>

                  {/* Rating Badge (Optional - can be added later) */}
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-700">4.8</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {place.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-3 text-sm">
                    <MapPin size={16} className="text-purple-600 mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{place.city}</span>
                  </div>

                  {/* Capacity and Details */}
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      <Users size={14} className="mr-1 text-blue-600" />
                      <span className="font-medium">{place.capacity} {place.capacity > 1 ? "persons" : "person"}</span>
                    </div>
                  </div>

                  {/* Description Preview */}
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                    {place.description}
                  </p>

                  {/* Owner Info (if available) */}
                  {place.ownerPhone && (
                    <div className="text-xs text-gray-500 mb-4 pb-4 border-t border-gray-200 pt-4">
                      <span className="font-semibold text-gray-700">Contact: </span>
                      {place.ownerPhone}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 items-center">
                    {/* View button - Full width */}
                    <Link
                      to={`/listing/${place.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                      title="View details"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </Link>

                    {/* Only show Edit/Delete for owner */}
                    {place.ownerEmail?.toLowerCase() === myEmail && (
                      <div className="flex gap-2">
                        <Link
                          to={`/edit-place/${place.id}`}
                          className="p-2.5 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors"
                          title="Edit post"
                        >
                          <Edit size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(place.id)}
                          className="p-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Delete post"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
