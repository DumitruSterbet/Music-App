import { useState } from "react";
import {
  useFetchTopCharts,
  useFetchArtists,
} from "../../src/lib/actions";

import { Helmet } from "react-helmet";
import { Sections } from "../../src/components";

export default function Discover() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [topChartCurrentPage, setTopChartCurrentPage] = useState(1);
  const topChartItemsPerPage = 10;


  const {
    data: topChartData,
    isPending: isTopChartDataPending,
    isSuccess: isTopChartDataSuccess,
  } = useFetchTopCharts({
    id: "0",
    section: "charts",
    page: topChartCurrentPage,
    limit: topChartItemsPerPage,
  });


  const { data: artists } = useFetchArtists(currentPage, itemsPerPage);


  const handleArtistPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle page change for top charts
  const handleTopChartPageChange = (newPage) => {
    setTopChartCurrentPage(newPage);
  };

  return (
    <section className="discover_page">
     
      <div className="flex flex-col gap-y-16">
        {/* Top Charts Section */}
        <Sections.MediaSection
          data={topChartData}
          title="Discover"
          subTitle="Explore albums"
          type="playlist"
          cardItemNumber={topChartItemsPerPage}
          isLoading={isTopChartDataPending}
          isSuccess={isTopChartDataSuccess}
        />

        {/* Pagination controls for top charts */}
        <div className="pagination-controls flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => handleTopChartPageChange(topChartCurrentPage - 1)}
            disabled={topChartCurrentPage === 1}
            className="pagination-button"
          >
            &larr;
          </button>
          <span className="text-center">Page {topChartCurrentPage}</span>
          <button
            onClick={() => handleTopChartPageChange(topChartCurrentPage + 1)}
            disabled={topChartData && topChartData.length < topChartItemsPerPage}
            className="pagination-button"
          >
            &rarr;
          </button>
        </div>

        {/* Suggested Artists Section */}
        <Sections.MediaSection
          data={artists}
          title="Suggested Artists"
          subTitle="Discover new sounds with handpicked artists tailored to your taste."
          skeletonItemNumber={10}
          randomListNumber={5}
          cardItemNumber={itemsPerPage}
          type="artist"
          isLoading={isTopChartDataPending}
          isSuccess={isTopChartDataSuccess}
        />

        {/* Pagination controls for artists */}
        <div className="pagination-controls flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => handleArtistPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &larr;
          </button>
          <span className="text-center">Page {currentPage}</span>
          <button
            onClick={() => handleArtistPageChange(currentPage + 1)}
            disabled={artists && artists.length < itemsPerPage}
            className="pagination-button"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
