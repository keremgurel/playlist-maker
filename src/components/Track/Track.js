import React from 'react';
import { ListItem, HStack, VStack, Text, IconButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const Track = ({ track, onAction, actionType }) => {
	return (
		<ListItem p={3} borderWidth={1} borderRadius='md'>
			<HStack justify='space-between' align='start'>
				<VStack align='start' spacing={1}>
					<Text align='start' fontSize={{ base: 'sm', md: 'md' }} fontWeight='bold'>
						{track.name}
					</Text>
					<Text align='start' color='gray.500' fontSize={{ base: 'xs', md: 'sm' }}>
						{track.artists} | {track.album}
					</Text>
				</VStack>
				<IconButton
					alignSelf='center'
					icon={actionType === 'add' ? <AddIcon /> : <MinusIcon />}
					aria-label={actionType === 'add' ? 'Add to playlist' : 'Remove from playlist'}
					onClick={() => onAction(track)}
					size='sm'
					variant='ghost'
					colorScheme={actionType === 'add' ? 'blue' : 'red'}
				/>
			</HStack>
		</ListItem>
	);
};

export default Track;
