import React from 'react';
import { VStack, HStack, Heading, List, Box, Input } from '@chakra-ui/react';
import Track from 'components/Track/Track';

const Playlist = ({ name, tracks, handleNameChange, handleRemoveFromPlaylist }) => {
	return (
		<Box
			backgroundColor='gray.800'
			p={6}
			borderRadius='md'
			height='100%'
			width='100%'
			display='flex'
			flexDirection='column'
		>
			<VStack spacing={4} alignItems='stretch'>
				<HStack spacing={6}>
					<Heading as='h2' fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
						Playlist:
					</Heading>
					<Input value={name} variant='flushed' placeholder='Name' onChange={handleNameChange} />
				</HStack>
				<List spacing={3} width='100%'>
					{tracks.map((track) => (
						<Track
							key={track.id}
							track={track}
							onAction={handleRemoveFromPlaylist}
							actionType='remove'
						/>
					))}
				</List>
			</VStack>
		</Box>
	);
};

export default Playlist;
