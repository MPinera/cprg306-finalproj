import Link from "next/link";

export default function Page() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8 dark:from-gray-800 dark:to-gray-900 transition-colors bg-gradient-to-b from-sky-400 to-blue-500"
      style={{ textAlign: "center" }}
    >
      <div className="text-bold font-bold">
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          CPRG 306: Web Development 2 - Project
        </h1>
        <p>
          <Link href="../weatheria">
            <button
              style={{
                padding: "0.5rem 1rem",
                fontSize: "3rem",
                cursor: "pointer",
              }}
            >
              Enter Weatheria
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}
