import {
  Box,
  Flex,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { DisplayPost } from '../../components/DisplayPost';
import { firestore } from '../../firebase';
import { IPost } from '../../interfaces';
import { mapPosts } from '../../mappers';

export interface IFeedPostsProps {
  userId: string;
}

export function FeedPosts({ userId }: IFeedPostsProps) {
  const templateColumns = useBreakpointValue({
    base: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(6, 1fr)',
  });

  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    const userRef = doc(firestore, 'users', userId);
    const postsQuery = query(
      collection(firestore, 'posts'),
      where('ownerRef', '==', userRef),
      orderBy('publishedAt', 'desc'),
      limit(6),
    );

    const unsubscribe = onSnapshot(postsQuery, async (querySnapshot) => {
      setPosts(await mapPosts(querySnapshot.docs));
    });

    return unsubscribe;
  }, []);

  return (
    <Grid templateColumns={templateColumns} gap="3">
      {posts.map((data) => (
        <GridItem key={data.id} w="100%">
          <DisplayPost data={data} />
        </GridItem>
      ))}
    </Grid>
  );
}

export function ModalFeedPosts({ userId }: IFeedPostsProps) {
  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    const userRef = doc(firestore, 'users', userId);
    const postsQuery = query(
      collection(firestore, 'posts'),
      where('ownerRef', '==', userRef),
      orderBy('publishedAt', 'desc'),
      limit(8),
    );

    const unsubscribe = onSnapshot(postsQuery, async (querySnapshot) => {
      setPosts(await mapPosts(querySnapshot.docs));
    });

    return unsubscribe;
  }, []);

  return (
    <Flex paddingBottom="3" gap="2">
      {posts.map((data) => (
        <Box key={data.id} width="40" flexShrink="0">
          <DisplayPost data={data} />
        </Box>
      ))}
    </Flex>
  );
}
