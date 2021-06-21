const requests = {
    fetchGames: `/games?page_size=40&key=${process.env.REACT_APP_API_KEY}`,
    fetchFighting: `/genres/6?key=${process.env.REACT_APP_API_KEY}`,
};

export default requests;