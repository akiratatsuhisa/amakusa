import { Container, Heading } from '@chakra-ui/react';

export function NotFound() {
  return (
    <Container paddingY="3" maxW="container.xl">
      <Heading as="h1" size="md" fontWeight="medium">
        Not Found
      </Heading>
    </Container>
  );
}
