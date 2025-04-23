import Link from "next/link";

export default function Page() {
  return (
    <div
      className="bg-gradient-to-b from-sky-400 to-blue-500"
      style={{ textAlign: "center" }}
    >
      <h1>CPRG 306: Web Development 2 - Project</h1>
      <p>
        <Link href="../weatheria">
          <button
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Enter Weatheria
          </button>
        </Link>
      </p>
    </div>
  );
}
