import { useState } from "react";

export default function AddWorkForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    field: "",
    place_of_application: "",
    experts: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/scientificworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        if (onSuccess) onSuccess();
      } else {
        const contentType = res.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          console.error("Failed to add work:", errorData);
          alert(
            `Error: ${errorData.error}\nDetails: ${errorData.details || "N/A"}`
          );
        } else {
          console.error("Failed to add work: Non-JSON response");
          const text = await res.text();
          alert(`Error: Non-JSON response\nDetails: ${text}`);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Unexpected error occurred: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        name="field"
        placeholder="Field"
        value={formData.field}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="number"
        name="place_of_application"
        placeholder="Place of Application"
        value={formData.place_of_application}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
      />
      {/* Scientific Works (optional input for adding) */}
      <textarea
        name="scientificWorks"
        placeholder="Scientific Works (comma-separated)"
        value={formData.experts.join(", ")}
        onChange={(e) =>
          setFormData({
            ...formData,
            experts: e.target.value.split(",").map((item) => item.trim()),
          })
        }
        className="border p-2 rounded w-full mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Work
      </button>
    </form>
  );
}
