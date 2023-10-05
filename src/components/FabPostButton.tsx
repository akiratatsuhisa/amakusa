import { AddIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import { useAuth } from '../contexts';
import { useBackgroundNavigate } from '../hooks';

export function FabPostButton() {
  const { isLogged } = useAuth();
  const { navigateModal } = useBackgroundNavigate();

  if (!isLogged) {
    return <></>;
  }

  return (
    <IconButton
      position="fixed"
      size="lg"
      bottom="6"
      right="6"
      icon={<AddIcon />}
      aria-label=""
      onClick={() => navigateModal('/post')}
    />
  );
}
