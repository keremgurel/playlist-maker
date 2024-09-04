import { useCallback, useEffect, useState } from 'react';
import './Home.css';
import { Box, Button, Stack, VStack, useBreakpointValue } from '@chakra-ui/react';
import SearchBar from 'components/SearchBar/SearchBar';
import SearchResults from 'components/SearchResults/SearchResults';
import Playlist from 'components/Playlist/Playlist';
import Spotify from 'utils/Spotify';

const Home = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [playlistName, setPlaylistName] = useState('New Playlist');
	const [isAuthorized, setIsAuthorized] = useState(false);

	// Use Chakra UI's useBreakpointValue to determine the direction of the Stack
	const direction = useBreakpointValue({ base: 'column', md: 'row' });

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
				minHeight='100vh'
				p={4}
				alignItems='center'
				justifyContent='center'
			>
				{isAuthorized ? (
					<VStack spacing={4} width='100%' height='100%'>
						<SearchBar handleSearch={searchSpotify} />
						<Stack
							direction={direction}
							spacing={4}
							width='100%'
							flex={1}
							overflow='hidden'
							height={{ base: 'calc(100vh - 200px)', md: 'calc(100vh - 180px)' }}
						>
							<Box
								flex={1}
								borderRadius='lg'
								backgroundColor='gray.700'
								overflowY='auto'
								minHeight={{ base: '300px', md: '500px', lg: '600px' }}
								maxHeight={{ base: '50vh', md: '70vh' }}
							>
								<SearchResults results={searchResults} handleAddToPlaylist={addToPlaylist} />
							</Box>
							<Box
								flex={1}
								borderRadius='lg'
								backgroundColor='gray.800'
								position='relative'
								overflowY='auto'
								minHeight={{ base: '300px', md: '500px', lg: '600px' }}
								maxHeight={{ base: '50vh', md: '70vh' }}
							>
								<Playlist
									name={playlistName}
									tracks={playlistTracks}
									handleNameChange={updatePlaylistName}
									handleRemoveFromPlaylist={removeFromPlaylist}
								/>
							</Box>
						</Stack>
						<Box width='100%' mt={4}>
							<Button
								colorScheme='blue'
								variant='solid'
								width='100%'
								height='50px'
								fontSize={{ base: 'sm', md: 'md' }}
								onClick={savePlaylist}
							>
								Save Playlist To Spotify
							</Button>
						</Box>
					</VStack>
				) : (
					<Button p={8} colorScheme='green' onClick={handleConnectToSpotify}>
						Connect to Spotify
					</Button>
				)}
			</Box>
		</div>
	);
};

export default Home;
