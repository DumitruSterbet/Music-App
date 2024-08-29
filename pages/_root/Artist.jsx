import { useState } from "react";
import { useParams } from "react-router-dom";

import { useFetchArtist } from "../../src/lib/actions";
import { Tab, Sections, TabContents } from "../../src/components";

export default function Artist() {
  const { id } = useParams();
  const {
    data: artist,
    isPending: artistDataPending,
    isSuccess: artistDataSuccess,
    isError: artistDataError,
    error: artistDataErrorDetails
  } = useFetchArtist(id);

  

  const { details, topTracks, albums, playlists, relatedArtists } = artist || {};
  console.log("Fetched artist data:",  details, topTracks, albums, playlists, relatedArtists);
  const [currentTab, setCurrentTab] = useState("discography");

  const content = {
    discography: (
      <TabContents.Discography
        setCurrentTab={setCurrentTab}
        data={artist}
        isPending={artistDataPending}
        isSuccess={artistDataSuccess}
      />
    ),
    playlists: (
      <TabContents.Playlists
        playlists={playlists}
        isPending={artistDataPending}
        isSuccess={artistDataSuccess}
      />
    ),
    top_tracks: (
      <TabContents.TopTracks
        topTracks={topTracks}
        isPending={artistDataPending}
        isSuccess={artistDataSuccess}
      />
    ),
    related_artists: (
      <TabContents.RelatedArtists
        relatedArtists={relatedArtists}
        isPending={artistDataPending}
        isSuccess={artistDataSuccess}
      />
    ),
    albums: (
      <TabContents.Albums
        albums={albums}
        isPending={artistDataPending}
        isSuccess={artistDataSuccess}
      />
    ),
  };

  if (artistDataPending) return <div>Loading artist data...</div>;
  if (artistDataError) return <div>Error: {artistDataErrorDetails.message}</div>;

  return (
    <section className="relative artist_section">
      <Sections.BannerSection
        details={details}
        tracks={topTracks}
        type="artist"
        isLoading={artistDataPending}
        isSuccess={artistDataSuccess}
      />
      <div className="mt-8">
        <Tab
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          content={content}
          tabs={[
            {
              id: "discography",
              name: "Discography",
              display: true,
            },
            {
              id: "top_tracks",
              name: "Top Tracks",
              display: topTracks?.length > 0,
            },
            
            {
              id: "related_artists",
              name: "Related Artists",
              display: relatedArtists?.length > 0,
            },
            { id: "albums", name: "Albums", display: albums?.length > 0 },
          ]}
          isLoaded={artistDataSuccess}
        />
      </div>
    </section>
  );
}
