export const requestHeader = (userInfo) => {
  if (userInfo) {
    return {
      headers: {
        Authorization: `Bearer ${userInfo?.user_token}`,
      },
    };
  } else {
    return {
      headers: {
        "Content-type": "application/json",
      },
    };
  }
};
