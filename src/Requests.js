const API_KEY = 'c2bf41a89ec34fc7ad609963aea08c14';

const requests = {
    fetchGames: `/games?page_size=40&key=${API_KEY}`,
    fetchAction: `/genres/4?key=${API_KEY}`,
    fetchShooter: `/genres/2?key=${API_KEY}`,
    fetchAdventure: `/genres/3?key=${API_KEY}`,
    fetchRPG: `/genres/5?key=${API_KEY}`,
    fetchFighting: `/genres/6?key=${API_KEY}`,
    fetchPuzzle: `/genres/7?key=${API_KEY}`,
    fetchRacing: `/genres/1?key=${API_KEY}`,
    fetchStrategy: `/genres/10?key=${API_KEY}`,
    fetchPlatformer: `/genres/83?key=${API_KEY}`,
    fetchCard: `/genres/17?key=${API_KEY}`,
    fetchIndie: `/genres/51?key=${API_KEY}`,
    fetchCasual: `/genres/40?key=${API_KEY}`,
};

export default requests;
export { API_KEY};