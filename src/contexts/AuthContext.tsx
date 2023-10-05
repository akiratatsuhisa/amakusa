import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { auth, firestore, storage } from '../firebase';

interface IAuthContext {
  currentUser: User | null;
  loading: boolean;
  isLogged: boolean;
  login(): Promise<UserCredential>;
  logout(): Promise<void>;
}

async function login(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);

  const userRef = doc(firestore, 'users', userCredential.user.uid);
  const user = await getDoc(userRef);

  // user already registered
  if (user.exists()) {
    return userCredential;
  }

  const photoUrl = await (async () => {
    if (!userCredential.user.photoURL) {
      return undefined;
    }

    const blob = await (await fetch(userCredential.user.photoURL)).blob();
    const photoRef = ref(storage, `users/${user.id}/${uuidv4()}.jpg`);
    await uploadBytes(photoRef, blob);
    return photoRef.fullPath;
  })();

  await setDoc(userRef, {
    photoUrl,
    displayName: userCredential.user.displayName,
  });

  return userCredential;
}

function logout() {
  return signOut(auth);
}

const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  loading: true,
  isLogged: false,
  login,
  logout,
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      setIsLogged(user !== null);
    });

    return unsubscribe;
  }, []);

  const value: IAuthContext = {
    currentUser,
    isLogged,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
