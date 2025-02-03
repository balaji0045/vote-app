// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut ,signInWithRedirect } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getDocs, collection, query, where } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtvytTBpUtDamGr-lrkPIqIdksPkeGunI",
  authDomain: "firstproject-58155.firebaseapp.com",
  projectId: "firstproject-58155",
  storageBucket: "firstproject-58155.firebasestorage.app",
  messagingSenderId: "878657114701",
  appId: "1:878657114701:web:6af61c091b4a2966f80204",
  measurementId: "G-S9C2HPLJMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app); // Initialize auth



// Check if the user is allowed
const checkAllowedUser = async (email) => {
  const q = query(collection(db, "allowedUsers"), where("email", "array-contains", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // If any document matches, user is allowed
};

// Google Sign-in function
const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account", // Ensures a fresh login
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const isAllowed = await checkAllowedUser(user.email);
    if (!isAllowed) {
      await logOut();
      throw new Error("You are not authorized to access the admin panel.");
    }

    return user;
  } catch (error) {
    alert(error.message);
    throw error;
  }
};


// Logout function
const logOut = () => signOut(auth);



const googleProvider = new GoogleAuthProvider(); // ✅ Create Google Provider


export { auth, signInWithGoogle, logOut, db,googleProvider, signInWithPopup, checkAllowedUser, signOut  };
