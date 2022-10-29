const someError = (params) => {
	if(!params.userId || !params.gameId || !params.text) return true
	return false
};

module.exports = {
  someError,
};
