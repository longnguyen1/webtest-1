"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditWorkPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const router = useRouter();

  console.log("Editing work with ID:", id); // Kiểm tra ID được truyền vào

  const [work, setWork] = useState(null);
  const [expert, setExpert] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [placeOfApplication, setPlaceOfApplication] = useState("");

  // Fetch dữ liệu expert và scientific works
  useEffect(() => {
    const fetchWork = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/scientificworks/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch work data");
        }
        const data = await response.json();
        setWork(data.work);
        setExpert(data.expert || []);

        setName(data.work.name || "");
        setField(data.work.field || "");
        setPlaceOfApplication(data.work.place_of_application || "");
        setSelectedExperts(
          data.experts?.map((expert) => expert.expert_id) || []
        );
      } catch (error) {
        console.error("Error fetching work data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedWork = {
      name,
      field,
      place_of_application: placeOfApplication,
    };

    try {
      const res = await fetch(`/api/scientificworks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expert: updatedWorks, selectedExperts }),
      });

      if (!res.ok) {
        throw new Error("Failed to update work");
      }

      alert("Work updated successfully!");
      router.push("/dashboard/scientificworks");
    } catch (error) {
      console.error("Error updating work:", error);
      alert("Failed to update work.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Page for ID: {id}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-bold">Field</label>
          <input
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-bold">Place of application</label>
          <input
            type="text"
            value={placeOfApplication}
            onChange={(e) => setPlaceOfApplication(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-bold">Select Scientific Works</label>
          <select
            multiple
            value={selectedExperts}
            onChange={(e) =>
              setSelectedExperts(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="border p-2 rounded w-full"
          >
            {scientificWorks.map((expert) => (
              <option key={expert.expert_id} value={expert.expert_id}>
                {expert.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditWorkPage;
