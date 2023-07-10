export const requestHeader = (userInfo: any) => {
	if (userInfo) {
		return {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo?.user_token}`
			}
		};
	} else {
		return {
			headers: {
				"Content-type": "application/json"
			}
		};
	}
};
