"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditExpertPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const router = useRouter();

  console.log("Editing expert with ID:", id); // Kiểm tra ID được truyền vào

  const [expert, setExpert] = useState(null);
  const [scientificWorks, setScientificWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [expertise, setExpertise] = useState("");
  const [selectedWorks, setSelectedWorks] = useState([]);

  // Fetch dữ liệu expert và scientific works
  useEffect(() => {
    const fetchExpert = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/experts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch expert data");
        }
        const data = await response.json();
        setExpert(data.expert);
        setScientificWorks(data.scientificWorks || []);
        setName(data.expert.name || "");
        setCode(data.expert.code || "");
        setYearOfBirth(data.expert.year_of_birth || "");
        setExpertise(data.expert.expertise || "");
        setSelectedWorks(
          data.scientificWorks?.map((work) => work.work_id) || []
        );
      } catch (error) {
        console.error("Error fetching expert data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedExpert = {
      name,
      code,
      year_of_birth: yearOfBirth,
      expertise,
    };

    try {
      const res = await fetch(`/api/experts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expert: updatedExpert, selectedWorks }),
      });

      if (!res.ok) {
        throw new Error("Failed to update expert");
      }

      alert("Expert updated successfully!");
      router.push("/dashboard/experts");
    } catch (error) {
      console.error("Error updating expert:", error);
      alert("Failed to update expert.");
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
          <label className="block font-bold">Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-bold">Year of Birth</label>
          <input
            type="text"
            value={yearOfBirth}
            onChange={(e) => setYearOfBirth(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-bold">Expertise</label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-bold">Select Scientific Works</label>
          <select
            multiple
            value={selectedWorks}
            onChange={(e) =>
              setSelectedWorks(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="border p-2 rounded w-full"
          >
            {scientificWorks.map((work) => (
              <option key={work.work_id} value={work.work_id}>
                {work.title}
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

export default EditExpertPage;
