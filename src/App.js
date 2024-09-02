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

	return (
		<div className='App'>
			<Box className='App-header' height='100vh'>
				<VStack spacing={12} height='100%' width='100%' p={4}>
					<SearchBar />
					<HStack spacing={4} flex={1} width='100%' alignItems='stretch'>
						<SearchResults results={mockResults} />
						<Playlist tracks={mockPlaylist} />
					</HStack>
				</VStack>
			</Box>
		</div>
	);
}

export default App;
