export const ApiError = (error:any) => {
    let errorMessage = "Something went wrong";
  
    if (error?.response && error?.response?.data) {
      switch (error.response.status) {
        case 500:
        case 404:
        case 401:
        case 403:
        case 400:
          errorMessage = error?.response?.data?.message || errorMessage;
          break;
        default:
          errorMessage = error?.response?.data?.message || errorMessage;
          break;
      }
    } else {
      errorMessage = error.message || errorMessage;
    }
  
    return { message: errorMessage };
  };
  