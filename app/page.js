import Link from "next/link";

export default function Page() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
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
