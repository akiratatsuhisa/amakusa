import { Box, Container, Flex, Heading } from '@chakra-ui/react';

export function Page() {
  return (
    <Container paddingY="3" maxW="container.xl">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="lg" fontWeight="bold" marginBottom="3">
          User
        </Heading>
      </Flex>

      <Box marginY="3"></Box>
    </Container>
  );
}
