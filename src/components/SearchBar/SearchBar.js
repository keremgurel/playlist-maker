import React from 'react';
import { Box, Button, Input } from '@chakra-ui/react';

const SearchBar = () => {
	return (
		<div>
			<Box display='flex' gap={4} mt={20}>
				<Input placeholder='Basic usage' />
				<Button colorScheme='blue'>Search</Button>
			</Box>
		</div>
	);
};

export default SearchBar;
