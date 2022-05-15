const getOtherEmail = (users, currentUser) => {
	return users?.filter((user) => user !== currentUser.email)[1];
};

export default getOtherEmail;
