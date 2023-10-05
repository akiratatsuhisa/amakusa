import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { storage } from '../firebase';

export interface IUseImageOptions {
  path?: string;
}

export function useImage({ path }: IUseImageOptions) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    if (!path) {
      return;
    }

    const imageRef = ref(storage, path);

    getDownloadURL(imageRef).then((url) => setSrc(url));
  }, [path]);

  return src;
}
