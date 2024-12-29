import $api from '../http';

import axios from 'axios';

export async function saveTokenFCM(tokenFCM: string): Promise<void> {
  try {
    const response = await $api.post(
      '/service1/fcm',
      JSON.stringify({
        token_fcm: tokenFCM,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserFCM(
  userId: string,
  tokenFCM: string,
): Promise<void> {
  try {
    const response = await $api.put(
      '/service1/fcm',
      JSON.stringify({
        _id: userId,
        token_fcm: tokenFCM,
      }),
      {
        headers: {
          withCredentials: true,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
}
