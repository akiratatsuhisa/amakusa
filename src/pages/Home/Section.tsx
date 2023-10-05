import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { DisplayPost } from '../../components/DisplayPost';
import { firestore } from '../../firebase';
import { IPost } from '../../interfaces';
import { mapPosts } from '../../mappers';

export function SectionNews() {
  const templateColumns = useBreakpointValue({
    base: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
    lg: 'repeat(6, 1fr)',
  });
  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    const postsQuery = query(
      collection(firestore, 'posts'),
      orderBy('publishedAt', 'desc'),
      limit(12),
    );

    const unsubscribe = onSnapshot(postsQuery, async (querySnapshot) => {
      setPosts(await mapPosts(querySnapshot.docs));
    });

    return unsubscribe;
  }, []);

  return (
    <Box marginY="3">
      <Heading as="h2" size="md" fontWeight="light">
        News
      </Heading>
      <Divider marginY="3" />

      <Grid templateColumns={templateColumns} gap="3">
        {posts.map((data) => (
          <GridItem key={data.id} w="100%">
            <DisplayPost data={data} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export function SectionTags() {
  return (
    <Box marginY="3">
      <Heading as="h2" size="md" fontWeight="light">
        Tags
      </Heading>
      <Divider marginY="3" />
    </Box>
  );
}

export function SectionRecommends() {
  return (
    <Box marginY="3">
      <Heading as="h2" size="md" fontWeight="light">
        Recommends
      </Heading>
      <Divider marginY="3" />
    </Box>
  );
}
