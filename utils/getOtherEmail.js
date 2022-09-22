const getOtherEmail = (users, currentUser) => {
	return users?.filter((user) => user !== currentUser);
};

export default getOtherEmail;
