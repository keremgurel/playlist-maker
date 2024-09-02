import React from 'react';
import { Box, Heading, List, VStack } from '@chakra-ui/react';
import Track from 'components/Track/Track';

const SearchResults = ({ results, handleAddToPlaylist }) => {
	return (
		<Box backgroundColor='gray.800' p={6} borderRadius='md' height='100%' width='100%'>
			<VStack height='100%' spacing={4}>
				<Heading as='h2' size='lg'>
					Search Results
				</Heading>
				<List spacing={3} overflowY='auto' flex={1} width='100%'>
					{results.map((result) => (
						<Track key={result.id} track={result} onAction={handleAddToPlaylist} actionType='add' />
					))}
				</List>
			</VStack>
		</Box>
	);
};

export default SearchResults;
