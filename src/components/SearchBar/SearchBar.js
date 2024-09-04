import React, { useCallback, useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';

const SearchBar = ({ handleSearch }) => {
	const [searchInput, setSearchInput] = useState('');

	const handleInputChange = useCallback((e) => {
		setSearchInput(e.target.value);
	}, []);

	const handleSearchClick = () => {
		handleSearch(searchInput);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearchClick();
		}
	};

	return (
		<div>
			<Box display='flex' gap={4} mt={16}>
				<Input
					placeholder='Search Tracks'
					value={searchInput}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
				/>
				<Button colorScheme='blue' onClick={handleSearchClick} variant='outline'>
					Search
				</Button>
			</Box>
		</div>
	);
};

export default SearchBar;
