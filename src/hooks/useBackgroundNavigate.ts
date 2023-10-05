import { useBreakpointValue } from '@chakra-ui/react';
import { useMemo } from 'react';
import {
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export function useBackgroundNavigate() {
  const modalSize = useBreakpointValue({ base: 'full', md: 'md' });
  const isFullSizeModal = useMemo(() => modalSize === 'full', [modalSize]);

  const navigate = useNavigate();
  const location = useLocation();

  function navigateModal(to: To, options?: NavigateOptions) {
    return navigate(to, {
      ...(options ?? {}),
      state: {
        ...(options?.state ?? {}),
        background: location.state?.background ?? location,
        backgroundTimes: Number(location.state?.backgroundTimes ?? '') + 1,
      },
    });
  }

  function onBackModal() {
    return navigate(-1);
  }

  function onCloseModal(force: boolean = false) {
    return modalSize === 'full' && !force
      ? navigate(-1)
      : navigate(-location.state.backgroundTimes);
  }

  return {
    modalSize,
    isFullSizeModal,
    navigateModal,
    onCloseModal,
    onBackModal,
  };
}
