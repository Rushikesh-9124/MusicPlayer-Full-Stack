import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#121212] to-red p-5">
            <div className="text-center ">
                <h1 className="text-[120px] font-extrabold text-white drop-shadow-lg animate-bounce">404</h1>
                <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">Page Not Found</h2>
                <p className="text-white text-lg mt-4  mb-5 max-w-md mx-auto">
                Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-indigo-100 transition-all duration-300"
                    >
                    Go Back Home
                </Link>
            </div>
        </div>
    </div>
  );
}