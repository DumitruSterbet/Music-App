import { useState } from "react";
import Head from "next/head";
import { useFetchTopCharts, useFetchArtists } from "../src/lib/actions";
import { Sections } from "../src/components";

export default function Discover({ totalAlbumsQuantity,totalArtistsQuantity}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [topChartCurrentPage, setTopChartCurrentPage] = useState(1);
  const topChartItemsPerPage = 10;
  const totalTopChartItems=totalAlbumsQuantity;
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
;

  const handleArtistPageChange = (newPage) => setCurrentPage(newPage);
  const handleTopChartPageChange = (newPage) => setTopChartCurrentPage(newPage);

  return (
    <>
    <Head>
        <title>Download Electronic Music - TuneTify</title>
        <meta
          name="description"
          content="Download Electronic Music - TuneTify download MP3 or WAV format - TuneTify"
        />
        </Head>

      <section className="discover_page">

       {/* Pagination controls for top charts */}
<div className="pagination-controls flex  gap-2 mt-4">
  <button
    onClick={() => handleTopChartPageChange(topChartCurrentPage - 1)}
    disabled={topChartCurrentPage === 1}
    className="pagination-button"
  >
    &larr; Previous
  </button>

  {/* Page numbers with `...` */}
  {Array.from(
    { length: Math.ceil(totalTopChartItems / topChartItemsPerPage) },
    (_, index) => index + 1
  )
    .filter((pageNumber) => {
      // Show the first, last, current, and nearby pages
      const totalPages = Math.ceil(totalTopChartItems / topChartItemsPerPage);
      return (
        pageNumber === 1 || // Always show the first page
        pageNumber === totalPages || // Always show the last page
        Math.abs(topChartCurrentPage - pageNumber) <= 2 // Show pages close to the current page
      );
    })
    .map((pageNumber, idx, filteredPages) => (
      <>
        {/* Add `...` for skipped ranges */}
        {idx > 0 && pageNumber > filteredPages[idx - 1] + 1 && (
          <span key={`ellipsis-${pageNumber}`} className="ellipsis">
            ...
          </span>
        )}
        <button
          key={pageNumber}
          onClick={() => handleTopChartPageChange(pageNumber)}
          className={`pagination-button ${
            topChartCurrentPage === pageNumber ? "active" : ""
          }`}
        >
          {pageNumber}
        </button>
      </>
    ))}

  <button
    onClick={() => handleTopChartPageChange(topChartCurrentPage + 1)}
    disabled={topChartData?.length < topChartItemsPerPage}
    className="pagination-button"
  >
    Next &rarr;
  </button>
</div>



        <div className="flex flex-col gap-y-16">
          {/* Top Charts Section */}
          {topChartData && (
            <Sections.MediaSection
              data={topChartData}
              title="Discover"
              subTitle="Explore albums"
              type="playlist"
              cardItemNumber={topChartItemsPerPage}
              isLoading={isTopChartDataPending}
              isSuccess={isTopChartDataSuccess}
            />
          )}

        
          {/* Suggested Artists Section */}
          {artists && (
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
          )}

         {/* Pagination controls for artists */}
<div className="pagination-controls flex gap-2 mt-4">
  <button
    onClick={() => handleArtistPageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="pagination-button"
  >
    &larr; Previous
  </button>

  {/* Page numbers with `...` */}
  {Array.from(
    { length: Math.ceil(totalArtistsQuantity / itemsPerPage) }, // Assuming `artists` includes a `total` property
    (_, index) => index + 1
  )
    .filter((pageNumber) => {
      // Show the first, last, current, and nearby pages
      const totalPages = Math.ceil(totalArtistsQuantity / itemsPerPage);
      return (
        pageNumber === 1 || // Always show the first page
        pageNumber === totalPages || // Always show the last page
        Math.abs(currentPage - pageNumber) <= 2 // Show pages close to the current page
      );
    })
    .map((pageNumber, idx, filteredPages) => (
      <>
        {/* Add `...` for skipped ranges */}
        {idx > 0 && pageNumber > filteredPages[idx - 1] + 1 && (
          <span key={`ellipsis-${pageNumber}`} className="ellipsis">
            ...
          </span>
        )}
        <button
          key={pageNumber}
          onClick={() => handleArtistPageChange(pageNumber)}
          className={`pagination-button ${
            currentPage === pageNumber ? "active" : ""
          }`}
        >
          {pageNumber}
        </button>
      </>
    ))}

  <button
    onClick={() => handleArtistPageChange(currentPage + 1)}
    disabled={artists?.data?.length < itemsPerPage}
    className="pagination-button"
  >
    Next &rarr;
  </button>
</div>
        </div>
      </section>
    </>
  );
}

import { parse, serialize } from 'cookie';
import { getStyleSettings,getAlbumsQuantity,getArtistsQuantity } from '../src/lib/helpers'; 
import { defaultThemeConfig } from '../src/configs/theme.config'; 

export async function getServerSideProps(context) {
  const { req, res } = context;
  const cookies = parse(req.headers.cookie || '');
  let theme = cookies.userTheme;
  const albumsQuantity = await getAlbumsQuantity();
  const artistsQuantity = await getArtistsQuantity();
  if (!theme) 
    {
    try {
      const styleSettings = await getStyleSettings();
      theme = JSON.stringify(styleSettings);
      res.setHeader('Set-Cookie', serialize('userTheme', theme, { httpOnly: false, path: '/' }));

    } catch (error) {
      
      theme = JSON.stringify(defaultThemeConfig);
      res.setHeader('Set-Cookie', serialize('userTheme', theme, { httpOnly: false, path: '/' }));
    }
  }

  return {
    props: {
      totalAlbumsQuantity: albumsQuantity|| null,
      totalArtistsQuantity: artistsQuantity|| null
    }, // Add necessary props if needed
  };
}