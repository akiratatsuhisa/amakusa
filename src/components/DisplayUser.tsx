import { Avatar, Box, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useBackgroundNavigate, useImage } from '../hooks';
import { IUser } from '../interfaces';

export interface IDisplayUserProps {
  data: IUser;
}

export function DisplayUser({ data }: IDisplayUserProps) {
  const navigate = useNavigate();
  const { navigateModal } = useBackgroundNavigate();

  const userPhotoSrc = useImage({ path: data.photoUrl });

  return (
    <Flex alignItems="center">
      <Avatar
        src={userPhotoSrc}
        size="sm"
        marginRight="2"
        cursor="pointer"
        onClick={() => navigateModal(`/users/${data.id}`)}
      />
      <Box>
        <Heading
          noOfLines={1}
          as="h3"
          fontSize="md"
          fontWeight="medium"
          _hover={{ textDecoration: 'underline' }}
          cursor="pointer"
          onClick={() => navigate(`/users/${data.id}`)}
        >
          {data.displayName}
        </Heading>
      </Box>
    </Flex>
  );
}
