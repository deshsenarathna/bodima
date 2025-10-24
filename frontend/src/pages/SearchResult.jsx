import { useSearchParams } from "react-router-dom";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const people = parseInt(searchParams.get("people") || "1", 10);

  // 🧩 Dummy data
  const dummyPlaces = [
    {
      id: 1,
      title: "Cozy Room Near University",
      city: "Colombo",
      capacity: 2,
      pricePerMonth: 15000,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "Modern Apartment in Kandy",
      city: "Kandy",
      capacity: 3,
      pricePerMonth: 25000,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      title: "Budget Room in Colombo",
      city: "Colombo",
      capacity: 1,
      pricePerMonth: 8000,
      image:
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=60",
    },
  ];

  // ✨ Filter results based on query params
  const filteredPlaces = dummyPlaces.filter(
    (p) =>
      p.city.toLowerCase() === city.toLowerCase() && p.capacity >= people
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">
        Boarding places in <span className="text-blue-600">{city}</span> for{" "}
        {people} person{people > 1 ? "s" : ""}
      </h2>

      {filteredPlaces.length === 0 ? (
        <p className="text-gray-500">No results found for this search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition p-4"
            >
              <img
                src={place.image}
                alt={place.title}
                className="rounded-xl mb-4 w-full h-40 object-cover"
              />
              <h3 className="font-bold text-lg">{place.title}</h3>
              <p className="text-gray-600">{place.city}</p>
              <p>Capacity: {place.capacity}</p>
              <p className="font-semibold text-blue-600">
                Rs {place.pricePerMonth.toLocaleString()}/month
              </p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
