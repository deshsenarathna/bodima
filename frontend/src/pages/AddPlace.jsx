import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPlace } from "../services/placeService";
import { useAuth } from "../hooks/useAuth";

export default function AddPlace() {
  const navigate = useNavigate();
  const user = useAuth();
  const ownerEmail = typeof user === "string" ? user : user?.email || "";

  const [formData, setFormData] = useState({
    title: "",
    city: "",
    capacity: "",
    pricePerMonth: "",
    description: "",
  });

  const [images, setImages] = useState([]);     // File[]
  const [previews, setPreviews] = useState([]); // string[]
  const MAX_IMAGES = 8;
  const MAX_MB = 5;

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_IMAGES - images.length;

    const add = files
      .slice(0, remaining)
      .filter((f) => f.type.startsWith("image/") && f.size <= MAX_MB * 1024 * 1024);

    const newPreviews = add.map((f) => URL.createObjectURL(f));

    setImages((prev) => [...prev, ...add]);
    setPreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  const removeImageAt = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[idx]);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("city", formData.city);
      fd.append("capacity", formData.capacity);
      fd.append("pricePerMonth", formData.pricePerMonth);
      fd.append("description", formData.description);
      if (ownerEmail) fd.append("ownerEmail", ownerEmail);
      images.forEach((file) => fd.append("images", file)); // multiple

      await createPlace(fd);
      alert("Place created successfully!");
      navigate("/search");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to create place");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Add Your Boarding Place</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400" required
              placeholder="Cozy room near university"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text" name="city" value={formData.city} onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400" required
              placeholder="Colombo"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Capacity</label>
              <input
                type="number" name="capacity" value={formData.capacity} onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400" required min="1" placeholder="2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Price per month (Rs)</label>
              <input
                type="number" name="pricePerMonth" value={formData.pricePerMonth} onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400" required min="0" placeholder="15000"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Photos
              <span className="ml-2 text-sm text-gray-500">(up to {MAX_IMAGES}, {MAX_MB}MB each)</span>
            </label>
            <input
              type="file" accept="image/*" multiple onChange={handleFilesChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />

            {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {previews.map((src, idx) => (
                  <div key={src} className="relative group">
                    <img src={src} alt={`Upload ${idx + 1}`} className="h-28 w-full object-cover rounded-lg border" />
                    <button
                      type="button" onClick={() => removeImageAt(idx)}
                      className="absolute top-1 right-1 hidden group-hover:inline-flex items-center px-2 py-1 text-xs rounded bg-red-600 text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description" value={formData.description} onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400" rows="4"
              placeholder="Describe the place, facilities, and neighborhood..." required
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
              Post Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}