
import { useRouter } from 'next/router'; // Import useRouter
import {
  useFetchNewReleases,
  useFetchGenreById,
} from "../../src/lib/actions";
import Head from "next/head";
import { Sections } from "../../src/components";

export default function GenrePage({genreDetails}) {
    const router = useRouter();
    const { id } = router.query; // Get the genre id from the URL

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

  const genreName = genre?.name || "Default Genre"; // Provide a default value
  console.log("Genre name", genreName);
  const gridNumber = 5;

  return (
    <section className="genre_section">
        <Head>
        <title>{`Download Genre ${genreDetails?.name} - TuneTify`}</title>
        <meta name="description" content={`Download Genre ${genreDetails?.name}  MP3 or WAV format - TuneTify`} />
      </Head>
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

import { getGenreDetails } from '../../src/lib/helpers';

export async function getServerSideProps(context) {
  const { id } = context.query;

    const albumData = await getGenreDetails(id);

  

    return {
      props: {
        genreDetails: albumData || null, // Pass the album data to the component
      },
    };
  
}


