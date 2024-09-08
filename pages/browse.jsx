import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'; // Import useRouter

import { classNames } from "../src/lib/utils";
import { useAppUtil } from "../src/lib/store";
import { useFetchGenres } from "../src/lib/actions";
import { Overlay } from "../src/components";

export default function Page() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const router = useRouter(); // Initialize useRouter

  const { getToggleGenres, toggleGenres } = useAppUtil();
  const { data: genres } = useFetchGenres();-

  // Navigate to genre page when selectedGenre changes
  useEffect(() => {
    if (selectedGenre) {
      router.push(`/genre/${selectedGenre}`); // Navigate to the genre page
    }
  }, [selectedGenre, router]);

  return (
    <div className="browse_page">
      <Head>
        <title>Download Electronic Genre genreName Music - TuneTify</title>
        <meta
          name="description"
          content="Download Electronic Genre genreName Music - TuneTify. Download MP3 or WAV format - TuneTify"
        />
      </Head>
      <div className="relative gap-6">
        <Overlay
          isOpen={toggleGenres}
          handleIsOpen={getToggleGenres}
          transparent
          className="z-[800]"
        />
        
        <div
          className={classNames(
            "grid grid-cols-3 gap-4 p-4",
            toggleGenres ? "left-sidebarHorizontal" : "left-[-500px]"
          )}
        >
          {genres &&
            genres.map((genre) => (
              <div
                key={genre.id}
                className={classNames(
                  "border border-main rounded p-4 text-center hover:bg-gray-200",
                  selectedGenre === genre.id && "bg-primary text-white"
                )}
              >
                <button
                  className="w-full h-full font-semibold"
                  onClick={() => {
                    setSelectedGenre(genre.id); // Set the selected genre
                    getToggleGenres(false); // Close the genre dropdown
                  }}
                >
                  {genre.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
