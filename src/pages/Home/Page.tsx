import { Container, Heading } from '@chakra-ui/react';

import { FabPostButton } from '../../components/FabPostButton';
import { SectionNews, SectionRecommends, SectionTags } from './Section';

export function Page() {
  return (
    <>
      <Container paddingY="3" maxW="container.xl">
        <Heading as="h1" size="lg" fontWeight="medium">
          Feeds
        </Heading>
        <SectionNews />
        <SectionTags />
        <SectionRecommends />
      </Container>

      <FabPostButton />
    </>
  );
}
