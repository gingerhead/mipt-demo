import axios from 'axios';

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error?.response?.data?.message) {
      if (Array.isArray(error?.response?.data?.message)) {
        return error.response.data.message[0]
      } else {
        return error.response.data.message
      }
    } else {
      return error.toString();
    }
  } else {
    return JSON.stringify(error).toString();
  }
}
