const getOtherEmail = (users, currentUser) => {
	return users?.filter((user) => user !== currentUser.email)[1];
};

export default getOtherEmail;

// TODO: fix the chats list display for the receiver
