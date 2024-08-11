import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useFetchSearch } from "@/lib/actions";
import { Tab, Title, TabContents } from "@/components";

export default function Search() {
  const [getQuery, setQuery] = useState(null);
  const [currentTab, setCurrentTab] = useState("all");

  const params = useParams();

  useEffect(() => {
    const query = new URL(window.location.href).searchParams.get("q");
    if (query) {
      setQuery(query);
    }
  }, [params]);

  const {
    isPending: searchDataPending,
    isSuccess: searchDataSuccess,
    data: searchResult,
  } = useFetchSearch({ searchText: getQuery });

  const { soundtracks, albums, playlists, artists } = searchResult || {};

  const tracks = soundtracks;
  console.log("search form search page tracks",tracks);
  const tracks2 = [
    {
      id: 1,
      name: 'Shape of You',
      artist: 'Ed Sheeran',
      album: '÷ (Divide)',
      duration: '3:53',
      releaseDate: '2017-01-06',
      genre: 'Pop'
    },
    {
      id: 2,
      name: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20',
      releaseDate: '2019-11-29',
      genre: 'Synthwave'
    },
    {
      id: 3,
      name: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: '3:23',
      releaseDate: '2020-03-27',
      genre: 'Disco'
    },
    {
      id: 4,
      name: 'Watermelon Sugar',
      artist: 'Harry Styles',
      album: 'Fine Line',
      duration: '2:54',
      releaseDate: '2020-05-15',
      genre: 'Pop'
    }
  ];
  
  const content = {
    all: (
      <TabContents.AllSearch
        setCurrentTab={setCurrentTab}
        data={searchResult}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    
    tracks: (
      <TabContents.TopTracks
        topTracks= {tracks2}
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
          {searchDataSuccess && tracks?.length 
          ? (
            <Tab
  currentTab={currentTab}
  setCurrentTab={setCurrentTab}
  content={content}
  tabs={[
    { id: "all", name: "All", display: true },
    { id: "tracks", name: "Tracks", display: tracks2?.length },
    { id: "artists", name: "Artists", display: artists?.length },
    { id: "albums", name: "Albums", display: albums?.length },
  ]}
  isLoaded={Boolean(searchResult)}
/>
          ) : (
            <div className="rounded p-4 bg-card shadow-lg w-fit">
              <Title name="No result found!" type="small" divider={false} />
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
