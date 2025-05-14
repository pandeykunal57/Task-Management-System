export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-red-600">403 - Unauthorized</h1>
        <p className="text-gray-700">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
}
