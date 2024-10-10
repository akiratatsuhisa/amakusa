import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import { MdLogin } from 'react-icons/md';
import { useNavigate, useOutlet } from 'react-router-dom';

import Logo from '../public/amakusa.svg';
import { useAuth } from './contexts';

export function Layout() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLogged, currentUser, login, logout } = useAuth();

  const outlet = useOutlet();

  return (
    <>
      <Box
        position="fixed"
        height="16"
        width="full"
        background="Background"
        shadow="base"
        zIndex="sticky"
      >
        <Container maxW="container.xl" width="full" height="full">
          <Flex
            alignItems="center"
            flexWrap="nowrap"
            width="full"
            height="full"
          >
            <Avatar
              src={Logo}
              size="sm"
              marginRight="1"
              cursor="pointer"
              onClick={() => navigate('/')}
            />
            <Box>
              <Heading
                as="p"
                size="md"
                fontWeight="semibold"
                cursor="pointer"
                onClick={() => navigate('/')}
              >
                Amakusa
              </Heading>
            </Box>
            <Box flex="1"></Box>

            <IconButton
              icon={<Icon as={colorMode === 'light' ? MoonIcon : SunIcon} />}
              aria-label="color mode"
              variant="ghost"
              onClick={toggleColorMode}
            />
            <Box width="2" />
            {isLogged ? (
              <Menu>
                <MenuButton>
                  <Avatar
                    shadow="base"
                    width="40px"
                    height="40px"
                    src={currentUser?.photoURL ?? ''}
                  />
                </MenuButton>

                <MenuList>
                  <MenuItem
                    onClick={() => navigate(`/users/${currentUser?.uid}`)}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <IconButton
                icon={<Icon as={MdLogin} />}
                aria-label="login"
                variant="ghost"
                onClick={login}
              />
            )}
          </Flex>
        </Container>
      </Box>

      <Box paddingTop="16" minHeight="100vh">
        {outlet}
      </Box>
    </>
  );
}
