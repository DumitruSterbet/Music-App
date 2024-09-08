import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useFetchSearch } from "../src/lib/actions";
import { Tab, Title, TabContents } from "../src/components";

export default function Search() {
  const [query, setQuery] = useState(null);
  const [currentTab, setCurrentTab] = useState("all");

  const router = useRouter();
  const { q } = router.query;

  // Update query when `q` changes
  useEffect(() => {
    if (q) {
      setQuery(q);
    }
  }, [q]);

  // Fetch search results based on `query`
  const {
    isPending: searchDataPending,
    isSuccess: searchDataSuccess,
    data: searchResult,
  } = useFetchSearch({ searchText: query });

  const { soundtracks, albums, artists } = searchResult || {};

  // Define the content for each tab
  const content = {
    all: (
      <TabContents.AllSearch
        setCurrentTab={setCurrentTab}
        data={searchResult}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    soundtracks: (
      <TabContents.TopTracks
        topTracks={soundtracks}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    artists: (
      <TabContents.RelatedArtists
        relatedArtists={artists}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    albums: (
      <TabContents.Albums
        albums={albums}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
  };

  return (
    <section className="search_page relative">
      {!searchDataPending ? (
        <>
          {searchDataSuccess ? (
            <Tab
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              content={content}
              tabs={[
                { id: "all", name: "All", display: true },
                { id: "soundtracks", name: "Tracks", display: soundtracks?.length || 0 },
                { id: "artists", name: "Artists", display: artists?.length || 0 },
                { id: "albums", name: "Albums", display: albums?.length || 0 },
              ]}
              isLoaded={Boolean(searchResult)}
            />
          ) : (
            <div className="rounded p-4 bg-card shadow-lg w-fit">
              <Title name="No results found!" type="small" divider={false} />
            </div>
          )}
        </>
      ) : (
        <div className="rounded p-4 bg-card shadow-lg w-fit">
          <Title name="Searching ..." type="small" divider={false} />
        </div>
      )}
    </section>
  );
}
