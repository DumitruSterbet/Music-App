import { useRouter } from "next/router"; // Import useRouter
import { useState } from "react"; // Import useState for managing pagination
import {
  useFetchNewReleases,
  useFetchGenreById,
} from "../../src/lib/actions";
import Head from "next/head";
import { Sections } from "../../src/components";

export default function GenrePage({ genreDetails,albumsQauntities }) {
  const router = useRouter();
  const { id } = router.query; // Get the genre id from the URL

  // Pagination states
 const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Fetch genre data
  const {
    data: genre,
    isSuccess: genreDataSuccess,
    isPending: genreDataPending,
  } = useFetchGenreById({ id });

  // Fetch new releases data
  const {
    data: newReleases,
    isPending: releasesDataPending,
    isSuccess: releasesDataSuccess,
  } = useFetchNewReleases({
    id,
    page: currentPage, // Add current page to the API request
    limit: itemsPerPage, // Add limit to the API request
  });

  const genreName = genre?.name || "Default Genre"; // Provide a default value
  const gridNumber = 5;
  const totalNewReleases = albumsQauntities; // Total items for pagination
console.log("sdafd",totalNewReleases);
  // Handle page changes
  const handlePageChange = (newPage) => {
   setCurrentPage(newPage);
  };

  return (
    <section className="genre_section">
      <Head>
        <title>{`Download Genre ${genreDetails?.name} - TuneTify`}</title>
        <meta
          name="description"
          content={`Download Genre ${genreDetails?.name} MP3 or WAV format - TuneTify`}
        />
      </Head>
      <div className="relative z-20 flex flex-col gap-10">
      <div className="pagination-controls flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &larr; Previous
          </button>

          {Array.from(
            { length: Math.ceil(totalNewReleases / itemsPerPage) }, // Calculate total pages
            (_, index) => index + 1
          )
            .filter((pageNumber) => {
              const totalPages = Math.ceil(totalNewReleases / itemsPerPage);
              return (
                pageNumber === 1 || // Always show the first page
                pageNumber === totalPages || // Always show the last page
                Math.abs(currentPage - pageNumber) <= 2 // Show pages close to the current page
              );
            })
            .map((pageNumber, idx, filteredPages) => (
              <>
                {/* Add `...` for skipped ranges */}
                {idx > 0 &&
                  pageNumber > filteredPages[idx - 1] + 1 && (
                    <span key={`ellipsis-${pageNumber}`} className="ellipsis">
                      ...
                    </span>
                  )}
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`pagination-button ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                >
                  {pageNumber}
                </button>
              </>
            ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalNewReleases / itemsPerPage)}
            className="pagination-button"
          >
            Next &rarr;
          </button>
        </div>
        <Sections.MediaSection
          data={newReleases}
          title={`New ${genreName} Releases`}
          titleType="large"
          titleDivider={false}
          type="album"
          cardItemNumber={itemsPerPage}
          gridNumber={gridNumber}
          isLoading={releasesDataPending && genreDataPending}
          isSuccess={releasesDataSuccess && genreDataSuccess}
        />
      {/* Pagination Controls */}
    
      </div>


   
    </section>
  );
}

import { getGenreDetails,getAlbumQuantityByGenre  } from "../../src/lib/helpers";

export async function getServerSideProps(context) {
  const { id } = context.query;

  const albumData = await getGenreDetails(id);
 const albumQuantity= await getAlbumQuantityByGenre(id);
  return {
    props: {
      genreDetails: albumData || null, 
      albumsQauntities:albumQuantity || null
    },
  };
}
