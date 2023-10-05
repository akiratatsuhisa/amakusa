import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '../contexts';
import { firestore } from '../firebase';
import { IPost } from '../interfaces';
import { mapPost } from '../mappers';

export function usePost(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [post, setPost] = useState<IPost | null>(null);
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const isExpandable = useMemo(() => {
    if (post && post.medias.length > 1) {
      return true;
    }

    return false;
  }, [post]);

  const docRef = useMemo(() => {
    return doc(firestore, 'posts', id);
  }, [id]);

  useEffect(() => {
    if (!docRef) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      if (!doc.exists()) {
        setError(true);
        setIsLoading(false);
        return;
      }

      setPost(await mapPost(doc));
      setError(false);
      setIsLoading(false);
    });

    return () => {
      setError(false);
      setIsLoading(true);
      setPost(null);
      setIsExpand(false);
      unsubscribe();
    };
  }, [docRef]);

  return { post, isLoading, error, isExpandable, isExpand, setIsExpand };
}

export function useFavorite(id: string) {
  const { currentUser, isLogged, login } = useAuth();

  const docRef = useMemo(() => {
    if (!currentUser) {
      return null;
    }

    return doc(firestore, 'posts', id, 'reactions', currentUser.uid);
  }, [id, currentUser]);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (!docRef) {
      return;
    }
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setIsFavorite(doc.exists());
    });
    return unsubscribe;
  }, [docRef, currentUser]);

  async function onToggleFavoritePost() {
    if (!isLogged) {
      login();
      return;
    }
    if (!docRef) {
      return;
    }
    const reaction = await getDoc(docRef);
    if (reaction.exists()) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, { type: true });
    }
  }

  const [countFavorites, setCountFavorites] = useState<number>();

  useEffect(() => {
    const collectionRef = collection(firestore, 'posts', id, 'reactions');

    const unsubscribe = onSnapshot(collectionRef, (onSnapshot) => {
      setCountFavorites(onSnapshot.size);
    });
    return unsubscribe;
  }, [id]);

  return {
    isFavorite,
    onToggleFavoritePost,
    countFavorites,
  };
}
