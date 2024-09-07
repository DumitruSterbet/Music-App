import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useFetchPlaylists, useGetArtistByIds } from "../../src/lib/actions";
import { Sections } from "../../src/components";
import Head from "next/head";

const allowedSection = ["playlist", "album", "radio"];

export default function Playlist({ albumDetails }) {
  const { id } = useRouter().query;
  const section = "playlist";
  const {
    playlists,
    isPending: playlistDataPending,
    isSuccess: playlistDataSuccess,
  } = useFetchPlaylists({ id, section });

  const [uniqueArtistIds, setUniqueArtistIds] = useState([]);
  const [transformedPlaylists, setTransformedPlaylists] = useState([]);

  const {
    data: albumArtistsData,
    isPending: artistsDataPending,
    isSuccess: artistsDataSuccess,
  } = useGetArtistByIds({ ids: uniqueArtistIds });

  useEffect(() => {
    if (Array.isArray(playlists)) {
      const allArtistIds = playlists.flatMap(song => {
        if (song && Array.isArray(song.artistsId)) {
          return song.artistsId;
        } else {
          return []; // Return an empty array if artistsId is missing
        }
      });

      // Get unique artist IDs
      const uniqueIds = [...new Set(allArtistIds)];
      setUniqueArtistIds(uniqueIds);
    }
  }, [playlists]);

  useEffect(() => {
    if (artistsDataSuccess && albumArtistsData) {
      // Create a map for quick look-up of artist data by ID
      const artistMap = new Map(albumArtistsData.map(artist => [artist.id, artist.name]));

      // Transform playlists to include artist objects
      const transformed = playlists.map(song => ({
        ...song,
        artists: song.artistsId.map(artistId => ({
          Id: artistId,
          Name: artistMap.get(artistId) || 'Unknown' // Get the artist name from the map
        }))
      }));

      setTransformedPlaylists(transformed);
    }
  }, [artistsDataSuccess, albumArtistsData, playlists]);

  if (!section || !id || !allowedSection.includes(section)) {
    // Handle invalid section or id
  }

  return (
    <section className="playlist_section">
      <Head>
        <title>{`Download album ${albumDetails?.name} - TuneTify`}</title>
        <meta name="description" content={`Download album ${albumDetails?.name} - Download MP3 or WAV format - TuneTify`} />
      </Head>
      {playlistDataPending || artistsDataPending ?
       (
        <div>Loading...</div>
       ) :
        (
        <>
          <Sections.BannerSection
            details={playlists}
            tracks={transformedPlaylists}
            isLoading={playlistDataPending || artistsDataPending}
            isSuccess={playlistDataSuccess}
            showPattern
          />

          <div className="relative mt-8">
            <Sections.TrackSection
              data={transformedPlaylists}
              details={{
                id: playlists?.id,
                type: playlists?.type,
              }}
              disableRowList={["dateCreated"]}
              skeletonItemNumber={20}
              isLoading={playlistDataPending || artistsDataPending}
              isSuccess={playlistDataSuccess}
            />
          </div>
        </>
      )}
    </section>
  );
}

import { getAlbumDetailedInfoApi } from '../../src/lib/helpers';

export async function getServerSideProps(context) {
  const { id } = context.query;

    const albumData = await getAlbumDetailedInfoApi(id);

  

    return {
      props: {
        albumDetails: albumData || null, // Pass the album data to the component
      },
    };
  
}
