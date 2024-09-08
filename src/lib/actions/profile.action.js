import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadImage, fbUpdateDoc, fbSnapshotDoc, apiQuery } from '../../lib/helpers';
import { useCurrentUser } from '../../lib/store';
import { useNotification } from '../../hooks';
//import { updateProfile, auth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'; // Import these from your Firebase setup

const defaultTheme = { mode: 'light' };
const defaultPlayerSettings = {}; // Define default player settings if needed

export const useGetProfile = () => {
  const { currentUser, getUserProfile } = useCurrentUser();
  const { user } = currentUser || {};

  const [prof, setProf] = useState(null);
  const [theme, setTheme] = useState(defaultTheme);
  const [playerSettings, setPlayerSettings] = useState(defaultPlayerSettings);

  useEffect(() => {
    const callback = (doc) => {
      if (doc?.data()) {
        const data = doc.data();
        setProf(data);
        setTheme( defaultTheme);
        setPlayerSettings( defaultPlayerSettings);
        getUserProfile(data);
      }
    };

    if (user?.uid) {
      const unsub = fbSnapshotDoc({
        collection: 'users',
        id: user.uid,
        callback,
      });

      return () => unsub();
    }
  }, [getUserProfile, user?.uid]);

  return { prof, theme, playerSettings };
};

export const useUpdateProfile = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const [notify] = useNotification();

  const { mutate: updateUserProfile, isLoading: isSubmitting, isSuccess: isSubmitted } = useMutation({
    mutationFn: async (values) => {
    }
  });

  return { updateUserProfile, isSubmitting, isSubmitted };
};

export const useUpdateAccountTheme = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await apiQuery({
          endpoint: 'styleSettings',
        });

        console.log("Theme set res", response);
        return response; // Return the full response object
      } catch (err) {
        console.error('Error updating theme:', err);
        throw err; // Rethrow to handle in the caller
      }
    },
  });

  return {
    updateTheme: mutation.mutate,
    isSubmitting: mutation.isLoading,
    isSubmitted: mutation.isSuccess,
    error: mutation.error, // Expose the error for handling
  };
};

export const useUpdateAccountPlayer = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const { mutate: updatePlayer, isLoading: isSubmitting, isSuccess: isSubmitted } = useMutation({
    mutationFn: async (player) => {
      if (userId) {
        try {
          await fbUpdateDoc({
            data: { player },
            collection: 'users',
            id: userId,
          });
        } catch (err) {
          console.error('Error updating player:', err);
        }
      }
    },
  });

  return { updatePlayer, isSubmitting, isSubmitted };
};

export const useUpdatePassword = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};


  const { mutate: updatePass, isLoading: isSubmitting, isSuccess: isSubmitted } = useMutation({
    mutationFn: async (values) => {
     
    },
  });

  return { updatePass, isSubmitting, isSubmitted };
};
