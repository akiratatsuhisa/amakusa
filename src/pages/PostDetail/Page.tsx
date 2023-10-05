import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { DisplayUser } from '../../components/DisplayUser';
import { FabPostButton } from '../../components/FabPostButton';
import { PageLoading } from '../../components/Loading';
import { usePost } from '../../hooks';
import { formatDateTime } from '../../utils';
import { FeedPosts } from './Feed';
import { PostImages } from './Media';

export function Page() {
  const navigate = useNavigate();
  const params = useParams();
  const { post, isLoading, error, isExpandable, isExpand, setIsExpand } =
    usePost(params.id!);

  if (isLoading) {
    return <PageLoading />;
  }

  if (error || !post) {
    navigate(-1);
    return <></>;
  }

  return (
    <>
      <Container paddingY="3" paddingX="0" maxW="container.xl">
        <Flex paddingX="3" justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="lg" fontWeight="bold" marginBottom="3">
            Post
          </Heading>

          <Tag size="lg">
            {post.medias.length} {post.medias.length === 1 ? 'Image' : 'Images'}
          </Tag>
        </Flex>

        <Box marginY="3">
          <PostImages
            id={params.id!}
            medias={post.medias}
            isExpandable={isExpandable}
            isExpand={isExpand}
            setIsExpand={setIsExpand}
          />
        </Box>

        <Box paddingX="3" marginY="3">
          <Heading
            marginY="2"
            as="p"
            fontSize="md"
            fontWeight="hairline"
            textAlign="right"
          >
            {formatDateTime(post.publishedAt, {
              locales: 'en',
              dateStyle: 'long',
              timeStyle: 'long',
            })}
          </Heading>
        </Box>

        {post.owner && (
          <Box paddingX="3" marginY="3">
            <DisplayUser data={post.owner} />
          </Box>
        )}

        <Box paddingX="3" marginY="3">
          <Heading as="h2" size="md" fontWeight="medium">
            Description
          </Heading>
          <Divider marginY="3" />
          <Text>{post.description}</Text>
        </Box>

        {post.owner && (
          <Box paddingX="3" marginY="3">
            <Heading as="h4" size="md" fontWeight="medium">
              Others
            </Heading>
            <Divider marginY="3" />
            <FeedPosts userId={post.owner.id} />
          </Box>
        )}
      </Container>

      <FabPostButton />
    </>
  );
}
