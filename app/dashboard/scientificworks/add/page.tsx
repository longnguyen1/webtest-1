"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddExpertPage() {
  const [formData, setFormData] = useState({
    name: "",
    field: "",
    place_of_application: "",
    experts: [],
  });

  const [expert, setExpert] = useState({
    name: "",
    code: "",
    year_of_birth: "",
    expertise: "",
  });
  const router = useRouter();

  const handleAddExpert = () => {
    setFormData({
      ...formData,
      experts: [...formData.experts, expert],
    });
    setExpert({ name: "", code: "", year_of_birth: "", expertise: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu lên API
      const res = await fetch("/api/scientificworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Work and experts added successfully!");
        router.push("/dashboard/scientificworks");
      } else {
        const errorData = await res.json();
        alert(`Failed to add Work and experts: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding Work and experts:", error);
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
            value={formData.field}
            onChange={(e) =>
              setFormData({ ...formData, field: e.target.value })
            }
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Year of Birth</label>
          <input
            type="number"
            value={formData.place_of_application}
            onChange={(e) =>
              setFormData({ ...formData, place_of_application: e.target.value })
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
            value={expert.name}
            onChange={(e) => setExpert({ ...expert, name: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Field</label>
          <input
            type="text"
            value={expert.code}
            onChange={(e) => setExpert({ ...expert, code: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Place of Application</label>
          <input
            type="text"
            value={expert.year_of_birth}
            onChange={(e) =>
              setExpert({ ...expert, year_of_birth: e.target.value })
            }
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Place of Application</label>
          <input
            type="text"
            value={expert.expertise}
            onChange={(e) =>
              setExpert({ ...expert, expertise: e.target.value })
            }
            className="border p-2 w-full"
          />
        </div>
        <button
          type="button"
          onClick={handleAddWork}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add expert to List
        </button>

        <ul className="mt-4">
          {formData.experts.map((expert, index) => (
            <li key={index}>
              {expert.name} - {expert.code} - {expert.year_of_birth} -{" "}
              {expert.expertise}
            </li>
          ))}
        </ul>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add work and experts
        </button>
      </form>
    </div>
  );
}
