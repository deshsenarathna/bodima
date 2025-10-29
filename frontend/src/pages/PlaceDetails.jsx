import { useParams, useNavigate, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { dummyPlaces } from "../data/dummyplaces";

export default function PlaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const placeId = Number(id);
  const place = useMemo(
    () => dummyPlaces.find((p) => p.id === placeId),
    [placeId]
  );

  const [activeIdx, setActiveIdx] = useState(0);

  if (!place) {
    return (
      <div className="p-8 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline mb-4"
          >
            ← Back
          </button>
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="text-gray-700">Listing not found.</p>
            <Link to="/search" className="text-blue-600 hover:underline">
              Go to Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    title,
    city,
    address,
    capacity,
    pricePerMonth,
    images = [],
    description,
    amenities = [],
    ownerEmail,
    ownerPhone,
    createdAt,
  } = place;

  const created = createdAt ? new Date(createdAt) : null;

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            ← Back
          </button>
          <Link to="/search" className="text-blue-600 hover:underline">
            Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <section className="lg:sticky top-6 self-start">
            <div className="bg-white rounded-2xl border p-4">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border">
                <img
                  src={images[activeIdx]}
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
                      title={`Image ${idx + 1}`}
                      type="button"
                    >
                      <img
                        src={src}
                        alt={`Thumb ${idx + 1}`}
                        className="h-20 w-full object-cover"
                      />
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
                  <p className="text-gray-600 mt-1">
                    {address ? `${address}, ` : ""}{city}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl font-semibold text-blue-600">
                    Rs {pricePerMonth.toLocaleString()}
                  </div>
                  <div className="text-gray-500 text-sm">per month</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-gray-700">
                <div>
                  <span className="text-gray-500">Capacity:</span> {capacity}
                </div>
                {created && (
                  <div>
                    <span className="text-gray-500">Listed on:</span>{" "}
                    {created.toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-2">About this place</h2>
              <p className="text-gray-700">{description}</p>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold">Amenities</h2>
              {amenities.length ? (
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                  {amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                      {a}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2">No amenities specified.</p>
              )}
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-3">Contact</h2>
              {ownerEmail && (
                <p className="text-gray-700">
                  <span className="text-gray-500">Email:</span> {ownerEmail}
                </p>
              )}
              {ownerPhone && (
                <p className="text-gray-700 mt-1">
                  <span className="text-gray-500">Phone:</span> {ownerPhone}
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                {ownerEmail && (
                  <a
                    href={`mailto:${ownerEmail}?subject=Inquiry about ${encodeURIComponent(
                      title
                    )}`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Send Email
                  </a>
                )}
                {ownerPhone && (
                  <a
                    href={`tel:${ownerPhone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
                  >
                    Call
                  </a>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}