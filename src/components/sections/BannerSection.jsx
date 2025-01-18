import { useMemo } from "react";
import { usePlayerStore } from "../../lib/store";
import { classNames, getFormatData } from "../../lib/utils";
import usePlayer from "../../hooks/usePlayer";
import { useGetAlbumDetailedInfo } from "../../lib/actions";

import {
  Title,
  IconButton,
  PatternBg,
  Genres,
  Contributors,
  MetaDetails,
  Skeletons,
} from "../../components";

export default function BannerSection(props) {
  const {
    details,
    hideActionButtons,
    tracks,
    type: typeAlt,
    showPattern,
    isLoading,
    isSuccess,
  } = props;

  const { playlistId, playlistType } = usePlayerStore();
  const { handlePlayPause, handleGetPlaylist, isPlaying } = usePlayer();

  const isCurrentPlaylist = useMemo(
    () => details && playlistId === details.id && playlistType === details.type,
    [details, playlistId, playlistType]
  );

  const trackFormatted = useMemo(() => getFormatData(tracks), [tracks]);

  const { desc, genres, contributors, albumsNo, fansNo } = getFormatData([details])?.[0] || {};

  const formatDuration = (duration) => {
    if (!duration) return '';
    const parts = duration.split(':');
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseInt(parts[2], 10) || 0;
    return `${hours} hrs ${minutes} mins ${seconds} secs`;
  };

  // Call hook unconditionally
  const albumId = details && Array.isArray(details) ? details[0]?.albumId : null;
  const albumDetails = useGetAlbumDetailedInfo(albumId).data || {};

  let type;
  let name, image, tracksNo, releaseDate, duration, albumArtists;
  let pagename;

  if (Array.isArray(details)) {
    console.log("Album detail", details);
    type = "album";
    pagename = "Album";
    name = albumDetails?.name;
    image = albumDetails?.imageUrl;
    tracksNo = albumDetails?.songQuantity;
    releaseDate = albumDetails?.publishedAt;
    duration = formatDuration(albumDetails?.duration);
    albumArtists = details?.flatMap(item => item.artists.map(artist => artist.name)).join(', ');
  // albumArtists =details.artistName;
  } else {
    type = "artist";
    pagename = "Artist";
    name = details?.name;
    image = details?.imageUrl;
    tracksNo = details?.songQuantity;
    releaseDate = details?.publishedAt;
    albumArtists = name;
  }

  const handleGetPlaylistFunc = () => {
    handleGetPlaylist({
      tracklist: trackFormatted,
      playlistId: details?.id,
      playlistType: details?.type,
      savePlay: true,
    });
  };

  return (
    <div className="relative banner_section">
      {typeAlt !== "search" && (
        <div className="absolute w-full h-full rounded bg-primary-opacity" />
      )}

      {isLoading && (
        <div className="animate_skeleton">
          <Skeletons.HeaderBannerSectionSkeleton type={typeAlt} />
        </div>
      )}

      {isSuccess && details && (
        <div className={classNames(typeAlt === "search" && "bg-card rounded p-6")}>
          {typeAlt === "search" && (
            <Title name={"Top Results"} type={"medium"} divider={false} />
          )}
          <div className={classNames(
            "relative flex flex-col xs:flex-row items-center overflow-hidden z-10 gap-6",
            typeAlt !== "search" ? "border-b-0 border-divider p-4" : "p-0"
          )}>
            {showPattern && <PatternBg />}
            <img
              src={image}
              alt=""
              className={classNames(
                "aspect-square h-[200px] shadow_card",
                type === "artist" ? "rounded-full w-[350px]" : "rounded w-[200px]"
              )}
            />
            <div className={classNames(
              "text-onNeutralBg flex w-full",
              typeAlt === "search"
                ? "flex-row items-center justify-start gap-8"
                : "flex-col items-start justify-between"
            )}>
              <div className="gap-2">
                <div className="flex items-center">
                  <div className="block capitalize">{type}</div>
                  <Genres genres={genres?.data} />
                </div>
                <Title
                  name={name}
                  type="extra-large"
                  divider={false}
                  desc={desc || <Contributors contributors={contributors} />}
                />
                {typeAlt !== "search" && (
                  <MetaDetails
                    {...{ tracksNo, albumsNo, fansNo, duration, releaseDate }}
                  />
                )}
              </div>
              {!hideActionButtons && (
                <div className="flex gap-4">
                  <IconButton
                    name={
                      isCurrentPlaylist
                        ? !isPlaying
                          ? "BsFillPlayFill"
                          : "BsFillPauseFill"
                        : "BsFillPlayFill"
                    }
                    className="w-10 h-10 bg-primary"
                    iconClassName="!text-white"
                    size={25}
                    onClick={
                      isCurrentPlaylist
                        ? handlePlayPause
                        : handleGetPlaylistFunc
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
