import { useState } from "react";

export default function AddPlace() {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    capacity: "",
    pricePerMonth: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // for now, just print in console (later we'll POST to backend)
    console.log("Place submitted:", formData);

    alert("Place data captured successfully (dummy mode for now)");
    setFormData({
      title: "",
      city: "",
      capacity: "",
      pricePerMonth: "",
      description: "",
      imageUrl: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Add Your Boarding Place
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Cozy room near university"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Colombo"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="2"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Price per month (Rs)</label>
              <input
                type="number"
                name="pricePerMonth"
                value={formData.pricePerMonth}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="15000"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Image URL (optional)</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="https://example.com/room.jpg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Describe your boarding place..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Submit Place
          </button>
        </form>
      </div>
    </div>
  );
}
