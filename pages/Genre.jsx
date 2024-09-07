import { useRouter } from 'next/router'; // Import useRouter
import {
  useFetchNewReleases,
  useFetchGenreById,
} from "../src/lib/actions";
import { Sections } from "../src/components";

export default function Genre() {
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
