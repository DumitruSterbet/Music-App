import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { apiQuery } from "@/lib/helpers";

export const useFetchTopCharts = (params) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["topCharts", params],
    queryFn: async () => {
      const { id, section } = params ?? {};

      if (!(id && section)) {
        throw new Error("Invalid params");
      }
      console.log("Id",{id});
      
      const data = await apiQuery({
        endpoint: `album`,
      });

      let resp;
      return data;
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchNewReleases = ({ id }) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: [`newReleases_${id}`, { id }],
    queryFn: async () => {
      try {
        if (id) {
  
          const data = await apiQuery({
            endpoint: `Album/GetByGenre/${id}`,
          });
          console.log("Get Albums by genre result", data);
          return data;
        } else {
          return null;
          // throw new Error("Invalid params");
        }
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchTopSelection = ({ id }) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: [`topSelection_${id}`, { id }],
    queryFn: async () => {
      try {
        if (id) {
          const data = await apiQuery({
            endpoint: `editorial/${id}/selection`,
          });

          return { ["selection"]: data };
        } else {
          return null;
        }
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchGenres = () => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      try {
        const response = await apiQuery({
          endpoint: `genre`,
        });
        console.log("Genres 2", response);
        return response;//?.data?.filter((item) => item.name !== "All");
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchGenreById = ({ id }) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: [`genreById_${id}`, { id }],
    queryFn: async () => {
      try {
        if (id) {
          console.log("Genre ID2",id);
          const response = await apiQuery({
            endpoint: `genre/${id}`,
          });
          console.log("Genre Data",response);
          return response;
        } else {
          return null;
        }
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchGenreBySection = ({ id, section }) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: [`genreBySection_${section}_${id}`, { id, section }],
    queryFn: async () => {
      try {
        if (id && section) {
          const response = await apiQuery({
            endpoint: `genre/${id}/${section}`,
          });

          return response;
        } else {
          return null;
        }
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchArtist = ({ id }) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: [`artist_${id}`, { id }],
    queryFn: async () => {
      try {
        if (id) {
          const limit = "?limit=20";

          const [
            details,
            topTracks,
            albums,
            relatedArtists,
            playlists,
            radios,
          ] = await Promise.all([
            apiQuery({ endpoint: `artist/${id}` }),
            apiQuery({ endpoint: `artist/${id}/top${limit}` }),
            apiQuery({ endpoint: `artist/${id}/albums${limit}` }),
            apiQuery({ endpoint: `artist/${id}/related${limit}` }),
            apiQuery({ endpoint: `artist/${id}/playlists${limit}` }),
            apiQuery({ endpoint: `artist/${id}/radio` }),
          ]);

          return {
            details,
            topTracks,
            albums,
            relatedArtists,
            playlists,
            radios,
          };
        } else {
          return null;
        }
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchChartBySection = ({ id, section }) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({

  
    queryKey: [`chartsBySection_${section}_${id}`, { id, section }],
    queryFn: async () => {
      console.log("Call chart");
      try {
        if (id && section) {
          const response = await apiQuery({
            endpoint: `chart/${id}/${section}`,
          });

          return response;
        } else {
          return null;
        }
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchPlaylists = ({ id, section }) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: [`playlist_${section}_${id}`, { id, section }],
    queryFn: async () => {
      try {
        if (id && section) {

          const response = await apiQuery({
            endpoint: `Products/GetByAlbum/${id}`,
          });

         

          // Validate and return the response
          if (response) {
            return response;
          } else {
   
            return null;
          }
        } else {
         
          return null;
        }
      } catch (err) {
    
        return null;
      }
    },
  });

  return {
    playlists: data,
    isPending: isFetching,
    isSuccess: isSuccess,
    isError: isError,
    error: error,
  };
};
export const fetchMultiplePlaylists = async (data) => {
  try {
    if (!data) {
      throw new Error("Invalid params");
    }
    const mappedData = data.map(async (item) => {
      const values = Object.values(item)?.[0];
      const { id, type } = values;

      if (!id || !type) {
        throw new Error("Invalid params");
      }
      return await apiQuery({
        endpoint: `${type}/${id}`,
      });
    });

    return await Promise.all(mappedData);
  } catch (error) {
    // console.log(error);
  }
};

export const useFetchTracks = () => {
  const [getId, setGetId] = useState(null);

  const { mutate: fetchTracks, isPending: isSubmitting } = useMutation({
    mutationFn: async (params) => {
      const { id, type, callback } = params || {};

      if (id && type) {
        try {
          setGetId(id);
           console.log("Fetch",id);
          const response = await apiQuery({
            endpoint: `Products/GetByAlbum/${id}`,
          });

          if (callback) callback(response.data);
        } catch (error) {
          // console.log(error);
        } finally {
          setGetId(null);
        }
      } else {
        return null;
      }
    },
  });

  return {
    fetchTracks,
    isSubmitting,
    getId,
  };
};

export const useFetchSearch = ({ searchText }) => {
  const { isPending, error, isError, isSuccess, data } = useQuery({
    queryKey: ["fetchSearch", { searchText }],
    queryFn: async () => {
      const limit = "";

      if (searchText?.trim()) {

       const response = await apiQuery({
          endpoint: `search/${searchText}`,
        });
    
        const {artists,albums,soundtracks} =response;

        return  { artists, albums ,soundtracks};
      } 
      else {
        return null;
      }
    },
  });

  return { isPending, error, isError, isSuccess, data };
};
