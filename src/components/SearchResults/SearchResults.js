import React from 'react';
import { Box, Heading, List, VStack } from '@chakra-ui/react';
import Track from 'components/Track/Track';

const SearchResults = ({ results, handleAddToPlaylist }) => {
	return (
		<Box p={6} height='80%' width='100%' alignItems='stretch'>
			<VStack height='100%' spacing={4} textAlign='start'>
				<Heading
					as='h2'
					fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}
					alignSelf='start'
					pt={1}
					pb={2}
				>
					Search Results
				</Heading>
				<List spacing={3} width='100%'>
					{results.map((result) => (
						<Track key={result.id} track={result} onAction={handleAddToPlaylist} actionType='add' />
					))}
				</List>
			</VStack>
		</Box>
	);
};

export default SearchResults;
