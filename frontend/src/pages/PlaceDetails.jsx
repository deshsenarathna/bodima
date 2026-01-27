import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getPlace } from "../services/placeService";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Resolve relative /uploads/... URLs to the backend host
function resolveImageUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/uploads/")) return `http://localhost:9090${url}`;
  return url;
}

// Geocode address to coordinates using OpenStreetMap Nominatim
async function geocodeAddress(address, city) {
  try {
    const fullAddress = [address, city].filter(Boolean).join(", ");
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
  } catch (err) {
    console.error("Geocoding error:", err);
  }
  // Default to Sri Lanka center if geocoding fails
  return { lat: 7.8731, lng: 80.7718 };
}

export default function PlaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const placeId = Number(id);

  const [place, setPlace] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mapCoords, setMapCoords] = useState(null);
  const [loadingMap, setLoadingMap] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getPlace(placeId)
      .then((data) => {
        if (alive) {
          setPlace(data);
          // Use saved coordinates if available, otherwise geocode
          if (data.latitude && data.longitude) {
            setMapCoords({ lat: data.latitude, lng: data.longitude });
          } else if (data.address || data.city) {
            setLoadingMap(true);
            geocodeAddress(data.address || "", data.city || "")
              .then((coords) => alive && setMapCoords(coords))
              .finally(() => alive && setLoadingMap(false));
          }
        }
      })
      .catch((e) => alive && setError(e.message || "Failed to load place"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [placeId]);

  // Support both backends:
  // - DTO: imageUrls = ["..."]
  // - Entity: images = [{ url: "..." }]
  const images = useMemo(() => {
    const arr = place?.imageUrls ?? place?.images?.map((i) => i.url) ?? [];
    return arr.map(resolveImageUrl);
  }, [place]);

  if (loading) return <div className="p-8">Loading...</div>;

  if (error) {
    return (
      <div className="p-8">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">
          ← Back
        </button>
        <div className="mt-4 text-red-600">{error}</div>
      </div>
    );
  }

  if (!place) return null;

  const title = place.title || "Listing";
  const addressLine = [place.address, place.city].filter(Boolean).join(", ");
  const price = Number(place.pricePerMonth || 0);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
          >
            ← Back
          </button>
          <Link 
            to="/search" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Images */}
          <section className="lg:sticky top-6 self-start">
            <div className="bg-white rounded-2xl border p-4">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border">
                <img
                  src={images[activeIdx] || "https://via.placeholder.com/1200x675?text=No+Image"}
                  alt={`Image ${activeIdx + 1} of ${title}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {images.length > 1 && (
                <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {images.map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      onClick={() => setActiveIdx(idx)}
                      className={`relative rounded-lg overflow-hidden border transition ${
                        idx === activeIdx ? "ring-2 ring-blue-600" : "hover:opacity-90"
                      }`}
                      type="button"
                      title={`Image ${idx + 1}`}
                    >
                      <img src={src} alt={`Thumb ${idx + 1}`} className="h-20 w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Right: Details */}
          <section className="space-y-6">
            <div className="bg-white rounded-2xl border p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                  <p className="text-gray-600 mt-1">{addressLine}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl font-semibold text-blue-600">Rs {price.toLocaleString()}</div>
                  <div className="text-gray-500 text-sm">per month</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-gray-700">
                <div>
                  <span className="text-gray-500">Capacity:</span> {place.capacity}
                </div>
                {place.createdAt && (
                  <div>
                    <span className="text-gray-500">Listed on:</span>{" "}
                    {new Date(place.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-2">About this place</h2>
              <p className="text-gray-700">{place.description}</p>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-3">Contact</h2>
              {place.ownerEmail && (
                <p className="text-gray-700">
                  <span className="text-gray-500">Email:</span> {place.ownerEmail}
                </p>
              )}
              {place.ownerPhone && (
                <p className="text-gray-700 mt-1">
                  <span className="text-gray-500">Phone:</span> {place.ownerPhone}
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                {place.ownerEmail && (
                  <a
                    href={`mailto:${place.ownerEmail}?subject=Inquiry about ${encodeURIComponent(title)}`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Send Email
                  </a>
                )}
                {place.ownerPhone && (
                  <a
                    href={`tel:${String(place.ownerPhone).replace(/\s+/g, "")}`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
                  >
                    Call
                  </a>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-3">Location</h2>
              {loadingMap ? (
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  Loading map...
                </div>
              ) : mapCoords ? (
                <MapContainer
                  center={[mapCoords.lat, mapCoords.lng]}
                  zoom={16}
                  style={{ height: "400px", borderRadius: "0.5rem" }}
                  className="rounded-lg overflow-hidden border"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[mapCoords.lat, mapCoords.lng]}>
                    <Popup>{addressLine}</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  Location map unavailable
                </div>
              )}
              {addressLine && (
                <p className="mt-3 text-gray-600 text-sm">
                  <span className="font-medium">Address:</span> {addressLine}
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}