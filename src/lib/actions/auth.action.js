/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
/* import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
  verifyPasswordResetCode,
} from "@firebase/auth"; */

import { useCurrentUser } from "../../lib/store";
import { fbSetDoc } from "../../lib/helpers";
import { useNotification } from "../../hooks";
/* import { auth, googleProvider, githubProvider } from "@/configs"; */

export const useAuthState = () => {
  const {
    getCurrentUser,
    userProfile: profile,
    getUserProfile,
  } = useCurrentUser();

  useEffect(() => {
   
    return undefined;
  }, [getCurrentUser, profile]);
};

export const useLogin = () => {
  const [notify] = useNotification();

  const {
    mutate: login,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (values) => {

    },
  });

  return { isSubmitting, isSubmitted, login };
};

export const useRegister = () => {
  const [notify] = useNotification();

  const {
    mutate: register,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (values) => {
    }
  });

  return { isSubmitting, isSubmitted, register };
};

export const useSocialAuthSignUp = () => {
  

  const {
    mutate: socialAuthSignUp,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async () => {
 
    },
  });

  return { isSubmitting, isSubmitted, socialAuthSignUp };
};

export const useSocialAuthSignUpRedirect = () => {
  const {
    mutate: socialAuthSignUpRedirect,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async () => {
   
    },
  });

  return { isSubmitting, isSubmitted, socialAuthSignUpRedirect };
};

export const useLogout = () => {


  const {
    mutate: logout,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async () => {
      
    },
  });

  return { isSubmitting, isSubmitted, logout };
};

export const useForgetPassCreate = () => {
  const [notify] = useNotification();

  const {
    mutate: forgetPassCreate,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async () => {
      
    },
  });

  return {
    forgetPassCreate,
    isSubmitting,
    isSubmitted,
  };
};

export const useVerifyResetPassword = (actionCode) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["resetPassword", { actionCode }],
    queryFn: async () => {
      
      
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useForgetPassReset = () => {




  const {
    mutate: forgetPassReset,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async () => {
     
    },
    onSuccess: () => {
    
    },
  });

  return {
    forgetPassReset,
    isSubmitting,
    isSubmitted,
  };
};
