import axios from 'axios';

const clientId = '2c03b3bc24224a8881cefd73d481ce44';
const clientSecret = '0de6cf3318ba4d8d89e405e20d5e2f9a';
const redirectUri = 'http://localhost:3000';

const scopes = ['user-read-email', 'playlist-modify-public', 'playlist-modify-private'];

let accessToken = localStorage.getItem('spotify_access_token') || '';
let refreshToken = localStorage.getItem('spotify_refresh_token') || '';

const Spotify = {
	getAuthorizationCode() {
		// Redirect to Spotify authorization page
		const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&scope=${scopes.join(
			'%20'
		)}&redirect_uri=${redirectUri}`;
		window.location = authUrl;
	},

	async getAccessToken() {
		if (accessToken) {
			return accessToken;
		}

		const code = new URLSearchParams(window.location.search).get('code');
		if (code) {
			// If we have authorization code, exchange it for access token
			const res = await axios.post(
				'https://accounts.spotify.com/api/token',
				{
					grant_type: 'authorization_code',
					code,
					redirect_uri: redirectUri,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
					},
				}
			);

			localStorage.setItem('spotify_access_token', res.data.access_token);
			localStorage.setItem('spotify_refresh_token', res.data.refresh_token);
		} else {
			// If we haven't yet authorized user and got an authorization code, redirect to Spotify authorization page
			Spotify.getAuthorizationCode();
		}
	},

	async refreshAccessToken() {
		if (refreshToken) {
			const res = await axios.post(
				'https://accounts.spotify.com/api/token',
				{
					grant_type: 'refresh_token',
					refresh_token: refreshToken,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
					},
				}
			);

			localStorage.setItem('spotify_access_token', res.data.access_token);
			localStorage.setItem('spotify_refresh_token', res.data.refresh_token);
		}

		// If we don't have a refresh token, redirect to Spotify authorization page
		Spotify.getAuthorizationCode();
	},
};

export default Spotify;
