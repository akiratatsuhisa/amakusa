import { Modal, ModalOverlay } from '@chakra-ui/react';
import { ReactNode } from 'react';
import {
  Location,
  Navigate,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from 'react-router-dom';

import { useAuth } from './contexts';
import { useBackgroundNavigate } from './hooks';
import { Layout } from './Layout.tsx';
import { NotFound } from './pages/Common';
import { Home } from './pages/Home';
import { Post } from './pages/Post';
import { PostDetail } from './pages/PostDetail';
import { UserDetail } from './pages/UserDetail';

export function App() {
  const { isLogged } = useAuth();

  const location = useLocation();
  const background =
    location.state && (location.state.background satisfies Location<unknown>);

  function authGuard(element: ReactNode) {
    return isLogged ? element : <Navigate to="/" />;
  }

  const routes = useRoutes(
    [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            index: true,
            path: '/',
            element: <Home.Page />,
          },
          {
            path: '/post',
            element: authGuard(<Post.Page />),
          },
          {
            path: '/posts/:id',
            element: <PostDetail.Page />,
          },
          {
            path: '/users/:id',
            element: <UserDetail.Page />,
          },
          { path: '/*', element: <NotFound /> },
        ],
      },
    ],
    background ?? location,
  );

  const { modalSize, onCloseModal } = useBackgroundNavigate();

  const modalRoute = (
    <Modal
      size={modalSize}
      onClose={onCloseModal}
      isOpen={!!background}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <Routes>
        <Route path="/post" element={authGuard(<Post.Modal />)} />
        <Route path="/posts/:id" element={<PostDetail.Modal />} />
        <Route path="/users/:id" element={<UserDetail.Modal />} />
      </Routes>
    </Modal>
  );

  return (
    <>
      {routes}
      {background && modalRoute}
    </>
  );
}
