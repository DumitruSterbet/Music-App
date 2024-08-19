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
          const response = await apiQuery({
            endpoint: `genre/${id}`,
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

export const useFetchArtist = (id) => {
  return useQuery({
    queryKey: [`artist_${id}`, { id }],
    queryFn: async () => {
      console.log("DDDD");
      if (id) {
        const limit = "?limit=20";
        try {
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
        } catch (error) {
          console.error("Error fetching artist data:", error);
          throw error;
        }
      } else {
        return null;
      }
    },
    onError: (error) => {
      console.error("Error in useQuery:", error);
    },
  });
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



export const useGetArtistByIds = ({ ids }) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: [`artistByIds_${ids.join('_')}`, { ids }],
    queryFn: async () => {
      try {
        if (ids && ids.length > 0) {
          const response = await apiQuery({
            endpoint: 'Artist/GetByIds',
            method: 'POST',
            config: {
              data: ids, // Pass the array of IDs as the request body
              headers: {
                'Content-Type': 'application/json'
              }
            }
          });
          return response;
        } else {
          return null;
        }
      } catch (error) {
        // Handle the error as needed
        console.error(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};


export const useDownload = async (data) => {
  try {
    if (!data) {
      throw new Error("Invalid params");
    }
   console.log("Data",data);
    const response = await apiQuery({
      endpoint: 'Products/Download',
      method: 'POST',
      config: {
        data, 
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });

    if (response) {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.name}.mp3`; // Set the filename based on data.name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } else {
      console.error('Failed to download song: No response received');
    }
  } catch (error) {
    console.error('Error downloading song:', error);
  }
};


export const getAlbumDetailedInfo = (id ) => {

 
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: [`genreById_${id}`, { id }],
    queryFn: async () => {
      try {
        if (id) {
       
          const response = await apiQuery({
            endpoint: `album/${id}`,
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
