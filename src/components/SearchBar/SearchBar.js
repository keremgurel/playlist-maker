import React, { useCallback, useState } from 'react';
import { HStack, Button, Input } from '@chakra-ui/react';

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
		<HStack width='100%' spacing={4}>
			<Input
				placeholder='Search Tracks'
				value={searchInput}
				onChange={handleInputChange}
				onKeyPress={handleKeyPress}
				size='lg'
				flex={1}
			/>
			<Button
				colorScheme='blue'
				onClick={handleSearchClick}
				size='lg'
				width={{ base: 'auto', md: '150px' }}
			>
				Search
			</Button>
		</HStack>
	);
};

export default SearchBar;
