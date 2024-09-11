import { useState } from "react";
import Head from "next/head";
import {
  useFetchTopCharts,
  useFetchArtists,
} from "../src/lib/actions";
import { Sections } from "../src/components";


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

  const handleTopChartPageChange = (newPage) => {
    setTopChartCurrentPage(newPage);
  };

  return (
    <>
      <Head>
        <title>Download Electronic Music - TuneTify </title>
        <description>
        Download Electronic Music - TuneTify  download MP3 or WAV format - TuneTify
        </description>
      </Head>

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
    </>
  );
}

import { parse, serialize } from 'cookie';
import { getStyleSettings } from '../src/lib/helpers'; 
import { defaultThemeConfig } from '../src/configs/theme.config'; // Import defaultThemeConfig if needed
export async function getServerSideProps(context) {
  const { req, res } = context;
  const cookies = parse(req.headers.cookie || '');
  let theme = cookies.userTheme;

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
    props: {}, // Add necessary props if needed
  };
}