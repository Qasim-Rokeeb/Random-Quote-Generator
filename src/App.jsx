import { useEffect, useState } from "react";

export default function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);

    try {
      // Using a CORS proxy to fetch from quotable API
      const res = await fetch(
        "https://api.allorigins.win/raw?url=https://api.quotable.io/random"
      );

      if (!res.ok) {
        console.error("Non-200 response:", res.status);
        throw new Error("API error");
      }

      const data = await res.json();
      console.log("Fetched Quote:", data);
      setQuote(data);
    } catch (err) {
      console.error("Fetch error:", err);

      // Fallback static quote
      setQuote({
        content: "Creativity is intelligence having fun.",
        author: "Albert Einstein",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-center">
      <h1 className="text-2xl font-bold mb-6">🧠 Random Quote Generator</h1>

      {loading && <p className="text-gray-600">Loading...</p>}

      {quote && !loading && (
        <div className="bg-white p-6 rounded shadow max-w-xl transition-all duration-300">
          <p className="text-xl italic mb-4">“{quote.content}”</p>
          <p className="text-right font-semibold text-gray-700">— {quote.author}</p>
        </div>
      )}

      {!quote && !loading && (
        <p className="text-red-600 mb-4">Failed to load quote. Please try again.</p>
      )}

      <button
        onClick={fetchQuote}
        className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        New Quote
      </button>
    </div>
  );
}
