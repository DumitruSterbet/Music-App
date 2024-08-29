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
        setTheme(data.prefs || defaultTheme);
        setPlayerSettings(data.player || defaultPlayerSettings);
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
      if (userId) {
        try {
          let profileImage = null;
          if (values?.files) {
            profileImage = await uploadImage({
              imageFile: values.files[0],
              storagePath: `users/${userId}`,
              fileName: 'avatar.jpg',
            });
          }

          await updateProfile(auth.currentUser, {
            photoURL: profileImage,
            displayName: values.username,
          });

          await fbUpdateDoc({
            data: { username: values.username, photoURL: profileImage },
            collection: 'users',
            id: userId,
          });

          notify({
            title: 'Success',
            variant: 'success',
            description: 'Profile updated successfully',
          });
        } catch (err) {
          console.error('Error updating profile:', err);
          notify({
            title: 'Error',
            variant: 'error',
            description: 'An error occurred!',
          });
        }
      }
    },
  });

  return { updateUserProfile, isSubmitting, isSubmitted };
};

export const useUpdateAccountTheme = () => {
  // State for theme settings (if necessary)
  const { mutate: updateTheme, isLoading: isSubmitting, isSuccess: isSubmitted } = useMutation({
    mutationFn: async (prefs) => {
      try {
        const response = await apiQuery({
          endpoint: 'styleSettings',
        });

        // Implement theme update logic here if necessary
      } catch (err) {
        console.error('Error updating theme:', err);
      }
    },
  });

  return { updateTheme, isSubmitting, isSubmitted };
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

  const [notify] = useNotification();

  const { mutate: updatePass, isLoading: isSubmitting, isSuccess: isSubmitted } = useMutation({
    mutationFn: async (values) => {
      if (userId) {
        try {
          const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            values.currentPassword
          );
          await reauthenticateWithCredential(auth.currentUser, credential);
          await updatePassword(auth.currentUser, values.newPassword);

          notify({
            title: 'Success',
            variant: 'success',
            description: 'Password updated successfully',
          });
        } catch (err) {
          console.error('Error updating password:', err);
          notify({
            title: 'Error',
            variant: 'error',
            description: 'An error occurred!',
          });
        }
      }
    },
  });

  return { updatePass, isSubmitting, isSubmitted };
};
