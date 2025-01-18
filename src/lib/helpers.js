import axios from "axios";
import imageCompression from "browser-image-compression";
import https from 'https';
const API_BASE_URL = "https://localhost:7199/api"; // Replace with your actual API base URL

//const DEEZER_API_URL = import.meta.env.VITE_PUBLIC_DEEZER_API_URL;
//const CORS_URL = import.meta.env.VITE_PUBLIC_CORS_URL;

/* const getBaseUrl = (endpoint) => {
  return `${CORS_URL}/${DEEZER_API_URL}/${endpoint}`;
};
 */
export const useUpdateAccountTheme = async () => {
  try {
 
    const response = await axios.get(`${API_BASE_URL}/styleSettings`,{ httpsAgent: agent });
    console.log("Cookies",response);
    return response.data;
  } catch (error) {
    console.error('Error updating theme:', error);
    // Handle the error (e.g., show a message to the user)
  }
};

export const getAlbums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/album`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch albums');
  }
};
// API query functions
export const getItemsByName = async (name) => {
  const response = await axios.get(`${API_BASE_URL}/products/filterBy/${name}`);
  return response.data;
};

export const getAllItems = async (query) => {
  const response = await axios.post(`${API_BASE_URL}/products/GetAllItems`, query);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

export const addItem = async (product) => {
  const response = await axios.post(API_BASE_URL, product);
  return response.data;
};

export const addBulkItems = async (url) => {
  const response = await axios.post(`${API_BASE_URL}/products/ExtractByUrl`, { url });
  return response.data;
};

export const updateItem = async (id, product) => {
  const response = await axios.put(`${API_BASE_URL}/products/${id}`, product);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};




const agent = new https.Agent({
  rejectUnauthorized: false, // Ignore self-signed certificate errors
});


// Upload image function
export const uploadImage = async ({ imageFile, storagePath, fileName }) => {
  const compressImgOption = {
    maxSizeMB: 0.05,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(imageFile, compressImgOption);

  // Assuming you have an endpoint to upload images
  const formData = new FormData();
  formData.append("file", compressedFile);
  formData.append("storagePath", storagePath);
  formData.append("fileName", fileName || compressedFile.name);

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.downloadURL;
};

// Firestore functions

export const apiQuery = async ({endpoint, config, method = "GET" }) => {
  try {


    const options = {
      url: `${API_BASE_URL}/${endpoint}`
      ,     
      method,
      ...config,
    };

    const response = await axios(options);
    return response.data;
  } catch (error) {

    
    let err = error.response
      ? {
          message:
            error.response.data.responseMessage || error.response.data.error,
        }
      : error;
    throw new Error(err);
  }
};

export const getGenreDetails = async (id) => {
  if (!id) return null;

  try {
    const response = await axios.get(`${API_BASE_URL}/genre/${id}`,{ httpsAgent: agent });


    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error('Error fetching album details:', error);
    throw error;
  }
};

export const getAllGenres = async () => {


  try {
    const response = await axios.get(`${API_BASE_URL}/genre`,{ httpsAgent: agent });


    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error('Error fetching album details:', error);
    throw error;
  }
};


export const getStyleSettings = async () => {


  try {
   
    const response = await axios.get(`${API_BASE_URL}/styleSettings`,{ httpsAgent: agent });
    console.log("Cookies",response);

    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error('Error fetching album details:', error);
  
  }
};

export const getAlbumQuantityByGenre = async (id) => {
  if (!id) return null;
  

  try {
    const response = await axios.get(`${API_BASE_URL}/album/GetQuantityByGenre/${id}`,{ httpsAgent: agent });


    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error('Error fetching album details:', error);
    throw error;
  }
};
export const getAlbumsQuantity = async () => {

  try {
    const response = await axios.get(`${API_BASE_URL}/album/GetTotalQuantity`,{ httpsAgent: agent });
    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error('Error getting quantity of albums', error);
    throw error;
  }
};

export const getArtistsQuantity = async () => {

  try {
    const response = await axios.get(`${API_BASE_URL}/artist/GetTotalQuantity`,{ httpsAgent: agent });
    return response.data; 
  } catch (error) {
    console.error('Error getting quantity of artists', error);
    throw error;
  }
};

export const getAlbumDetailedInfoApi = async (id) => {
  if (!id) return null;
  

  try {
    const response = await axios.get(`${API_BASE_URL}/album/${id}`,{ httpsAgent: agent });


    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error('Error fetching album details:', error);
    throw error;
  }
};


export const getArtistsByAlbum = async (id) => {
  if (!id) return null;
  

  try {
    const response = await axios.get(`${API_BASE_URL}/artist/GetByAlbum/${id}`,{ httpsAgent: agent });


    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error('Error fetching album artists:', error);
    throw error;
  }
};



export const getAritstDetails = async (id) => {
  if (!id) return null;

  try {
    const response = await axios.get(`${API_BASE_URL}/artist/${id}`,{ httpsAgent: agent });
    return response.data;
  } catch (error) {
    console.error('Error fetching album details:', error);
    throw error;

  }
};


// Data formatting function
export const dataFormatted = async (data) => {
  try {
    const dataMapped = data
      ? Object.entries(data).map(async (dataItem) => {
          const key = dataItem[0];
          const { data: value } = dataItem[1] || {};

          let valueMappedPromise;
          const size = 20;

          if (!["tracks"].includes(key)) {
            const valueMapped = value?.slice(0, size)?.map((valueItem) => {
              try {
                const { tracklist } = valueItem;

                if (tracklist) {
                  return {
                    ...valueItem,
                  };
                } else {
                  return { ...valueItem, tracks: null };
                }
              } catch (error) {
                throw new Error(error);
              }
            });
            valueMappedPromise = await Promise.all(valueMapped);
          } else {
            valueMappedPromise = data;
          }
          return { [key]: { data: valueMappedPromise } };
        })
      : [];
    const dataMappedPromise = await Promise.all(dataMapped);

    const resultReduced = dataMappedPromise.reduce((acc, item) => {
      acc = Object.assign(acc, item);
      return acc;
    }, {});
    return resultReduced;
  } catch (error) {
    throw new Error(error);
  }
};
export const fbAddDoc = async ({ data, collection }) => {
  const response = await axios.post(`${API_BASE_URL}/addDoc`, { data, collection });
  return response.data;
};

export const fbSetDoc = async ({ data, id, collection }) => {
  const response = await axios.post(`${API_BASE_URL}/setDoc`, { data, id, collection });
  return response.data;
};

export const fbGetDoc = async ({ collection, id }) => {
  const response = await axios.get(`${API_BASE_URL}/getDoc/${collection}/${id}`);
  return response.data;
};

export const fbUpdateDoc = async ({ data, collection, id }) => {
  const response = await axios.put(`${API_BASE_URL}/updateDoc/${collection}/${id}`, data);
  return response.data;
};

export const fbDeleteDoc = async ({ collection, id }) => {
  const response = await axios.delete(`${API_BASE_URL}/deleteDoc/${collection}/${id}`);
  return response.data;
};

export const fbGetCollection = async ({ collection, whereQueries = [], orderByQueries = [] }) => {
  const response = await axios.post(`${API_BASE_URL}/getCollection`, { collection, whereQueries, orderByQueries });
  return response.data;
};

export const fbSnapshotDoc = ({ collection, id, callback }) => {
  const eventSource = new EventSource(`${API_BASE_URL}/snapshot/${collection}/${id}`);
  eventSource.onmessage = (event) => {
    callback(JSON.parse(event.data));
  };

  return () => {
    eventSource.close();
  };
};

export const fbDeleteStorage = async (storagePath) => {
  const response = await axios.delete(`${API_BASE_URL}/deleteStorage`, { data: { storagePath } });
  return response.data;
};

export const fbCountCollection = async ({ collection, whereQueries }) => {
  const response = await axios.post(`${API_BASE_URL}/countCollection`, { collection, whereQueries });
  return response.data.count;
};