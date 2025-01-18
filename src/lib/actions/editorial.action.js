import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { apiQuery } from "../../lib/helpers";

export const useFetchTopCharts = (params) => {
  const { id, section, limit , page = 1 } = params ?? {};
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["topCharts", params],
    queryFn: async () => {
      const { id, section } = params ?? {};

      if (!(id && section)) {
        throw new Error("Invalid params");
      }     
      const data = await apiQuery({
        endpoint: `album?limit=${limit}&page=${page}`,
      });
      return data;
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchNewReleases = ({ id, page, limit }) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: [`newReleases_${id}`, { id, page, limit }], // Include page and limit in the queryKey
    queryFn: async () => {
      if (!id) {
        throw new Error("Invalid params");
      }
      console.log("Fetching data with page:", page, "limit:", limit);
      const data = await apiQuery({
        endpoint: `Album/GetByGenre/${id}?limit=${limit}&page=${page}`,
      });
      return data;
    },
    keepPreviousData: true, // Optional: Keep old data while fetching new data
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
     
      if (id) {
        const limit = "?limit=20";
        try {
          const promises = [
            apiQuery({ endpoint: `artist/${id}` }), // Artist details
            apiQuery({ endpoint: `products/${id}/top${limit}` }), // Top tracks
            apiQuery({ endpoint: `album/${id}/albums${limit}` }), // Albums
            apiQuery({ endpoint: `artist/${id}/related${limit}` }), // Related artists
           // apiQuery({ endpoint: `artist/${id}/playlists${limit}` }) // Playlists
          ];
        
          // Await all promises and destructure the results
          const [detailsResponse, topTracksResponse, albumsResponse, relatedArtistsResponse, playlistsResponse] = await Promise.all(promises);
        

          console.log("Raw Responses:", { detailsResponse, topTracksResponse, albumsResponse, relatedArtistsResponse});

          // Extract data from responses (assuming data is in a 'data' field)
          const details = detailsResponse;
          const topTracks = topTracksResponse;
          const albums = albumsResponse;
          const relatedArtists = relatedArtistsResponse;
        //  const playlists = playlistsResponse.data;

        //console.log("Raw Responses:", { detailsResponse, topTracksResponse, albumsResponse });
    
          return {
            details,
            topTracks,
            albums,
            relatedArtists,
          //  playlists
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


export const useFetchArtists = (page, limit) => {
  return useQuery({
    queryKey: ['fetchArtists', page, limit], // Add queryKey to cache results based on page and limit
    queryFn: async () => {

      try {
        const detailsResponse = await apiQuery({ endpoint: `artist?limit=${limit}&page=${page}`});
        return detailsResponse;
      } 
      catch (error) {
        console.error("Error fetching artist data:", error);
        throw error;
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
      try
       {

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

export const useTopPick = ( ) => {

 
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["topPick"],
    queryFn: async () => {
      try {
              
          const response = await apiQuery({
            endpoint: `Products/GetTopPick`,
          });
          console.log("ToPicks query",response);
          return response;
        
        
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};


export const useGetAlbumDetailedInfo = (id ) => {

 
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
