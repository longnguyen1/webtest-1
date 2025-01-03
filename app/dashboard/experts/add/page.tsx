"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddExpertPage() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    year_of_birth: "",
    expertise: "",
    scientificWorks: [],
  });

  const [work, setWork] = useState({
    name: "",
    field: "",
    place_of_application: "",
  });
  const router = useRouter();

  const handleAddWork = () => {
    setFormData({
      ...formData,
      scientificWorks: [...formData.scientificWorks, work],
    });
    setWork({ name: "", field: "", place_of_application: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu lên API
      const res = await fetch("/api/experts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Expert and works added successfully!");
        router.push("/dashboard/experts");
      } else {
        const errorData = await res.json();
        alert(`Failed to add expert and works: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding expert and works:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add Expert and Works</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Code</label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Year of Birth</label>
          <input
            type="number"
            value={formData.year_of_birth}
            onChange={(e) =>
              setFormData({ ...formData, year_of_birth: e.target.value })
            }
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Expertise</label>
          <input
            type="text"
            value={formData.expertise}
            onChange={(e) =>
              setFormData({ ...formData, expertise: e.target.value })
            }
            required
            className="border p-2 w-full"
          />
        </div>

        <h2 className="text-xl font-bold mb-4">Scientific Works</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Work Name</label>
          <input
            type="text"
            value={work.name}
            onChange={(e) => setWork({ ...work, name: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Field</label>
          <input
            type="text"
            value={work.field}
            onChange={(e) => setWork({ ...work, field: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Place of Application</label>
          <input
            type="text"
            value={work.place_of_application}
            onChange={(e) =>
              setWork({ ...work, place_of_application: e.target.value })
            }
            className="border p-2 w-full"
          />
        </div>
        <button
          type="button"
          onClick={handleAddWork}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Work to List
        </button>

        <ul className="mt-4">
          {formData.scientificWorks.map((work, index) => (
            <li key={index}>
              {work.name} - {work.field} - {work.place_of_application}
            </li>
          ))}
        </ul>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Expert and Works
        </button>
      </form>
    </div>
  );
}
