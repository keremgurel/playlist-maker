import axios from 'axios';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri =
	process.env.NODE_ENV === 'production' ? 'https://playlist.keremg.com/' : 'http://localhost:3000/';

const Spotify = {
	connect() {
		const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
		window.location = accessUrl;

		this.getAccessToken();
	},

	getAccessToken() {
		let accessToken = localStorage.getItem('spotify_access_token') || '';
		let accessTokenExpiration = localStorage.getItem('spotify_access_token_expiration') || '';

		if (accessToken && new Date().getTime() < Number(accessTokenExpiration)) {
			return accessToken;
		}

		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
		if (accessTokenMatch && expiresInMatch) {
			const token = accessTokenMatch[1];
			const expirationTime = Number(expiresInMatch[1]) * 1000;
			console.log(token, expirationTime);

			localStorage.setItem('spotify_access_token', token.toString());
			localStorage.setItem(
				'spotify_access_token_expiration',
				new Date().getTime() + expirationTime
			);

			// Set a timeout to clear the local storage variables after the access tokens expiration.
			window.setTimeout(() => {
				localStorage.removeItem('spotify_access_token');
				localStorage.removeItem('spotify_access_token_expiration');
			}, Number(expirationTime));

			// Clears the URL parameters for removing the access token and expiration time from the URL after they have been extracted, allowing us to grab a new access token when it expires
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		}
		this.connect();
	},

	async search(searchInput) {
		const accessToken = await this.getAccessToken();
		if (!accessToken || !searchInput) {
			console.error('No access token or search input');
			return [];
		}

		const response = await axios.get('https://api.spotify.com/v1/search', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			params: {
				q: searchInput,
				type: 'track',
			},
		});

		const result = response.data.tracks.items.map((track) => ({
			id: track.id,
			name: track.name,
			artists: track.artists[0].name,
			album: track.album.name,
			uri: track.uri,
		}));

		return result;
	},

	async savePlaylist(name, trackUris) {
		if (!name || !trackUris.length) {
			return;
		}

		const token = await this.getAccessToken();
		const headers = { Authorization: `Bearer ${token}` };

		try {
			// Get user ID
			const userResponse = await axios.get('https://api.spotify.com/v1/me', { headers });
			const userId = userResponse.data.id;

			// Create a new playlist
			const createPlaylistResponse = await axios.post(
				`https://api.spotify.com/v1/users/${userId}/playlists`,
				{ name },
				{ headers }
			);
			const playlistId = createPlaylistResponse.data.id;

			// Add tracks to the playlist
			await axios.post(
				`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
				{ uris: trackUris },
				{ headers }
			);
		} catch (error) {
			console.error('Error saving playlist:', error);
		}
	},
};

export default Spotify;
