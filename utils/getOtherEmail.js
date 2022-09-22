const getOtherEmail = (users, currentUser) => {
	return users?.filter((user) => user !== currentUser);
};

export default getOtherEmail;

// TODO: fix the chats list display for the receiver (display the other email, not own)
