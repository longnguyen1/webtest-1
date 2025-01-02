import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <Link
          href="/dashboard/users"
          className="block p-6 bg-blue-100 rounded shadow"
        >
          <h2 className="text-xl font-bold">Manage Users</h2>
        </Link>
        <Link
          href="/dashboard/experts"
          className="block p-6 bg-green-100 rounded shadow"
        >
          <h2 className="text-xl font-bold">Manage Experts</h2>
        </Link>
        <Link
          href="/dashboard/scientificworks"
          className="block p-6 bg-yellow-100 rounded shadow"
        >
          <h2 className="text-xl font-bold">Manage Scientific Works</h2>
        </Link>
      </div>
    </div>
  );
}
