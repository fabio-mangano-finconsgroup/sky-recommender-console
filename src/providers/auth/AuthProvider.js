// import axios from 'axios';

export const signIn = async (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    });
  }, 1000);
};

export const signOut = async (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    });
  }, 1000);
};
