import { Navigate, useParams } from "react-router-dom";

import { useFetchPlaylists } from "@/lib/actions";
import { Sections } from "@/components";

const allowedSection = ["playlist", "album", "radio"];

export default function Playlist() {
  const { section = "playlist", id } = useParams();

  const {
    playlists,
    isPending: playlistDataPending,
    isSuccess: playlistDataSuccess,
  } = useFetchPlaylists({ id, section });
  

  const { tracks } = playlists || {};
console.log("Playlist page",playlists);
  if (!section || !id || !allowedSection.includes(section)) {
    return <Navigate to="/discover" replace />;
  }

  return (
    <section className="playlist_section">
      {playlists && 
      (
        <>
          <Sections.BannerSection
            details={playlists}
            tracks={playlists}
            isLoading={playlistDataPending}
            isSuccess={playlistDataSuccess}
            showPattern
          />

          <div className="relative mt-8">           
            <Sections.TrackSection
              data={playlists}
              details={{
                id: playlists?.id,
                type: playlists?.type,
              }}
              disableRowList={["dateCreated"]}
              skeletonItemNumber={20}
              isLoading={playlistDataPending}
              isSuccess={playlistDataSuccess}
            />
          </div>
        </>
      )}
    </section>
  );
}
