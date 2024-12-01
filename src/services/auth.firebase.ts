import firebase_app from "./config.firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";

type DispatchFunc = (payload: {user: User | null, error: string | null}) => void
const SignIn = (dispatchCallback: DispatchFunc) => {
  const auth = getAuth(firebase_app);
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((re) => {
      console.log(re);
      dispatchCallback({ user: (re.user) as User, error: null });
    })
    .catch((err) => {
      console.error(err);
      dispatchCallback({ error: err, user: null });
    });
};

const checkLogged = (dispatchCallback) => {
  const auth = getAuth(firebase_app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatchCallback({
        uid: user.uid,
        displayName: user.displayName,
        profileImage: user.photoURL,
      });
    } else {
      dispatchCallback(null);
    }
  });
};

const SignOut = (dispatchCallback) => {
  const auth = getAuth(firebase_app);
  firebaseSignOut(auth);
  dispatchCallback(null);
};

export { SignIn, SignOut, checkLogged };