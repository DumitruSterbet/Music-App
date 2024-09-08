import { useId, useMemo } from "react";

import { Sections } from "../../components";

export default function AllSearch({
  setCurrentTab,
  data,
  isPending,
  isSuccess,
}) {


  
  const { artists, soundtracks, albums, playlists } = data || {};

  
console.log("Search",data);

  const bannerD = useMemo(() => {
    let details, type, soundtracks;
    if (artists?.length) {
      details = artists[0];
      type = "artist";
   
    } else if (albums?.length) {
      details = albums[0].soundtracks;
      type = "album";
      soundtracks= albums[0]?.soundtracks;
    } 

    return { details, type, soundtracks };
  }, [albums, artists, playlists]);

  return (
    <div className="relative h-screen mt-8 all_tab_content">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-10">
        <div className="flex flex-col col-span-1 gap-8 md:col-span-6">
          {/* <Sections.BannerSection
            details={bannerD?.details}
            tracks={bannerD?.tracks}
            type="search"
            isLoading={isPending}
            isSuccess={isSuccess}
          />
 */}
          <Sections.MediaSection
            data={artists?.slice(0, 3)}
            title="Artists"
            titleType="medium"
            titleDivider={false}
            type="artist"
            gridNumber={3}
            showMoreLink={() => setCurrentTab("related_artists")}
            cardItemNumber={9}
            isLoading={isPending}
            isSuccess={isSuccess}
          />

          <Sections.MediaSection
            data={albums?.slice(0, 3)}
            title="Albums"
            titleType="medium"
            titleDivider={false}
            showMoreLink={() => setCurrentTab("albums")}
            type="album"
            cardItemNumber={9}
            gridNumber={3}
            isLoading={isPending}
            isSuccess={isSuccess}
          />

          
        </div>
        <div className="flex flex-col col-span-1 gap-8 md:col-span-4">
          <div className="sticky top-0">
            <Sections.TrackSection
              data={soundtracks?.slice(0, 5)}
              details={{
                id: bannerD?.details?.id,
                type: bannerD?.type,
              }}
              disableHeader
              disableRowList={["album", "actions", "dateCreated"]}
              imageDims="16"
              enableTitle
              listDivider={false}
              titleName="Tracks"
              titleDivider={false}
              titleType="medium"
              showMoreLink={() => setCurrentTab("tracks")}
              showMoreDisplay="bottom"
              isLoading={isPending}
              isSuccess={isSuccess}
            />

            
          </div>
        </div>
      </div>
    </div>
  );
}
