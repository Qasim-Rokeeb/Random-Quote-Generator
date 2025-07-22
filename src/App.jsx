import { useEffect, useState } from "react";
const [quotes, setQuotes] = useState([]);
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    if (quotes.length === 0) {
    setLoading(true);
   const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();
    setQuotes(data);          // cache full array
   setLoading(false);
  }
  const rnd = quotes[Math.floor(Math.random() * quotes.length)];
   setQuote({ content: rnd.text, author: rnd.author || "Unknown" });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4
                     bg-gradient-to-br from-purple-200 via-indigo-200 to-blue-200
                     dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900
                     transition-colors">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <h1 className="font-poppins text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100">
        🧠 Random Quote
      </h1>

      {loading && (
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      )}

      {quote && !loading && (
        <figure className="max-w-xl w-full p-8 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg shadow-xl
                           transform transition-all animate-fade-in-up">
          <blockquote className="text-2xl italic mb-4 text-gray-800 dark:text-gray-100">
            “{quote.content}”
          </blockquote>
          <figcaption className="text-right font-semibold text-indigo-600 dark:text-indigo-300">
            — {quote.author}
          </figcaption>
        </figure>
      )}

      {!quote && !loading && (
        <p className="text-red-500">Could not load quote. Please try again.</p>
      )}

      <button
        onClick={fetchQuote}
        className="mt-10 px-8 py-3 bg-indigo-600 text-white rounded-full
                   hover:bg-indigo-700 focus:outline-none focus:ring-4
                   focus:ring-indigo-400/50 transition"
      >
        New Quote
      </button>

      {/* micro-animation keyframes */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up .4s ease-out forwards; }
      `}</style>
    </main>
  );
}