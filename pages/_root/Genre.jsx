import {
  useFetchNewReleases,
  useFetchGenreById,
} from "../../src/lib/actions";
import { Sections } from "../../src/components";

import { Helmet } from "react-helmet";

export default function Genre({ id }) {

  const {
    data: genre,
    isSuccess: genreDataSuccess,
    isPending: genreDataPending,
  } = useFetchGenreById({ id });



  const {
    data: newReleases,
    isPending: releasesDataPending,
    isSuccess: releasesDataSuccess,
  } = useFetchNewReleases({
    id,
  });
  const genreName = genre?.name;
  const gridNumber = 5;

  return (

   
    <section className="genre_section">
       <Helmet>
    
    <title>{`Download Electronic Genre ${genreName} Music  - Site name`}</title>
    <meta name="description" content={`Download Electronic Genre ${genreName} Music Download MP3 or WAV format - Site name`} />   
    <meta property="og:title" content={`Download Electronic Genre ${genreName} Music  - Site name`} />
    <meta property="og:description" content={`Download Electronic Genre ${genreName} Music  Download MP3 or WAV format - Site name`} />
     <meta property="og:url" content={window.location.href} />
    <meta name="twitter:title" content={`Download Electronic Genre ${genreName} Music  - Site name`} />
    <meta name="twitter:description" content={`Download Electronic Genre ${genreName} Music  Download MP3 or WAV format  ${window.location.href}`} /> 

      </Helmet>
      <div className="relative z-20 flex flex-col gap-10">


         <Sections.MediaSection
          data={newReleases}
          title={`New ${genreName} Releases`}
          titleType="large"
          titleDivider={false}
          type="album"
          cardItemNumber={10}
          gridNumber={gridNumber}
          isLoading={releasesDataPending && genreDataPending}
          isSuccess={releasesDataSuccess && genreDataSuccess}
        />
    
      </div>
    </section>
  );
}
