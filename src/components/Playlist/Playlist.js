import React from 'react';
import { VStack, HStack, Heading, List, Button, Box, Input } from '@chakra-ui/react';
import Track from 'components/Track/Track';

const Playlist = ({ tracks }) => {
	return (
		<Box backgroundColor='gray.800' p={6} borderRadius='md' height='100%' width='100%'>
			<VStack height='100%' spacing={4} alignItems='stretch'>
				<HStack spacing={6}>
					<Heading as='h2' size='lg'>
						Playlist:
					</Heading>
					<Input variant='flushed' placeholder='Name' defaultValue='New Playlist' />
				</HStack>
				<VStack spacing={6} flex={1} width='100%' overflowY='auto'>
					<List spacing={3} width='100%'>
						{tracks.map((track) => (
							<Track key={track.id} track={track} onAction={() => {}} actionType='remove' />
						))}
					</List>
					<Button colorScheme='blue' variant='outline' width='100%' height='50px'>
						Save Playlist To Spotify
					</Button>
				</VStack>
			</VStack>
		</Box>
	);
};

export default Playlist;
