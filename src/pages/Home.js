import { useCallback, useEffect, useState } from 'react';
import './Home.css';
import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import SearchBar from 'components/SearchBar/SearchBar';
import SearchResults from 'components/SearchResults/SearchResults';
import Playlist from 'components/Playlist/Playlist';
import Spotify from 'utils/Spotify';

const Home = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [playlistName, setPlaylistName] = useState('New Playlist');
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		const token = Spotify.getAccessToken();
		if (token || localStorage.getItem('spotify_access_token')) {
			setIsAuthorized(true);
		}
	}, []);

	const searchSpotify = useCallback(async (searchInput) => {
		const results = await Spotify.search(searchInput);
		setSearchResults(results);
	}, []);

	const updatePlaylistName = useCallback((e) => {
		setPlaylistName(e.target.value);
	}, []);

	const addToPlaylist = useCallback(
		(track) => {
			if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) return;
			setPlaylistTracks((prev) => [...prev, track]);
		},
		[playlistTracks]
	);

	const removeFromPlaylist = useCallback((track) => {
		setPlaylistTracks((prevTracks) =>
			prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
		);
	}, []);

	const savePlaylist = useCallback(() => {
		const trackUris = playlistTracks.map((track) => track.uri);
		Spotify.savePlaylist(playlistName, trackUris).then(() => {
			setPlaylistName('New Playlist');
			setPlaylistTracks([]);
		});
	}, [playlistName, playlistTracks]);

	const handleConnectToSpotify = useCallback(() => {
		Spotify.connect();
	}, []);

	return (
		<div className='App'>
			<Box
				className='App-header'
				display='flex'
				flexDirection='column'
				backgroundColor='#282c34'
				color='white'
				height='100vh'
				alignItems='center'
				justifyContent='center'
			>
				{isAuthorized ? (
					<VStack spacing={4} width='100%' p={4}>
						<SearchBar handleSearch={searchSpotify} />
						<HStack spacing={4} flex={1} width='100%' overflow='hidden'>
							<Box
								flex={1}
								borderRadius='lg'
								height='70vh'
								overflowY='auto'
								backgroundColor='gray.700'
							>
								<SearchResults results={searchResults} handleAddToPlaylist={addToPlaylist} />
							</Box>
							<Box
								flex={1}
								borderRadius='lg'
								height='70vh'
								overflowY='auto'
								backgroundColor='gray.800'
							>
								<Playlist
									name={playlistName}
									tracks={playlistTracks}
									handleNameChange={updatePlaylistName}
									handleRemoveFromPlaylist={removeFromPlaylist}
									handleSavePlaylist={savePlaylist}
								/>
							</Box>
						</HStack>
					</VStack>
				) : (
					<Button colorScheme='green' onClick={handleConnectToSpotify}>
						Connect to Spotify
					</Button>
				)}
			</Box>
		</div>
	);
};

export default Home;
