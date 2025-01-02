import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserForm from "@/components/UserForm"; // Đảm bảo đường dẫn đúng

export default function EditUserPage() {
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [userId]);

  const handleUpdate = (updatedUser) => {
    // Cập nhật thành công, bạn có thể thực hiện các bước như cập nhật danh sách người dùng trong state.
    console.log("User updated successfully:", updatedUser);
  };

  return (
    <div>
      {userData ? (
        <UserForm userId={userId} userData={userData} onUpdate={handleUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
