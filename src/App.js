import { useCallback, useState } from 'react';
import './App.css';
import { Box, HStack, VStack } from '@chakra-ui/react';
import SearchBar from 'components/SearchBar/SearchBar';
import SearchResults from 'components/SearchResults/SearchResults';
import Playlist from 'components/Playlist/Playlist';

function App() {
	const mockResults = [
		{ id: 1, name: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)' },
		{ id: 2, name: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours' },
		{ id: 3, name: 'Dance Monkey', artist: 'Tones and I', album: 'The Kids Are Coming' },
		{
			id: 4,
			name: 'Someone You Loved',
			artist: 'Lewis Capaldi',
			album: 'Divinely Uninspired to a Hellish Extent',
		},
	];
	const mockPlaylist = [{ id: 1, name: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)' }];
	const [searchResults, setSearchResults] = useState(mockResults);
	const [playlistTracks, setPlaylistTracks] = useState(mockPlaylist);
	const [playlistName, setPlaylistName] = useState('New Playlist');

	const updatePlaylistName = useCallback((name) => {
		setPlaylistName(name);
	}, []);

	const addToPlaylist = useCallback((track) => {
		setPlaylistTracks((prev) => [...prev, track]);
	}, []);

	const removeFromPlaylist = useCallback((track) => {
		setPlaylistTracks((prevTracks) => {
			const index = prevTracks.findIndex((t) => t.id === track.id);
			if (index !== -1) {
				const newTracks = [...prevTracks];
				newTracks.splice(index, 1);
				return newTracks;
			}
			return prevTracks;
		});
	}, []);

	const savePlaylist = useCallback(() => {
		console.log('savePlaylist', playlistTracks);
	}, [playlistTracks]);

	return (
		<div className='App'>
			<Box className='App-header' height='100vh'>
				<VStack spacing={12} height='100%' width='100%' p={4}>
					<SearchBar />
					<HStack spacing={4} flex={1} width='100%' alignItems='stretch'>
						<SearchResults results={searchResults} handleAddToPlaylist={addToPlaylist} />
						<Playlist
							name={playlistName}
							tracks={playlistTracks}
							handleNameChange={updatePlaylistName}
							handleRemoveFromPlaylist={removeFromPlaylist}
							handleSavePlaylist={savePlaylist}
						/>
					</HStack>
				</VStack>
			</Box>
		</div>
	);
}

export default App;
