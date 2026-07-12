import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Added document helpers

const firebaseConfig = {
  apiKey: "AIzaSyBaATpTwFJN3ZhwPwJSwajxgopsSfqRZLM",
  authDomain: "reforged-b8582.firebaseapp.com",
  projectId: "reforged-b8582",
  storageBucket: "reforged-b8582.firebasestorage.app",
  messagingSenderId: "162751773697",
  appId: "1:162751773697:web:fab59bdc13e2f7fb749400",
  measurementId: "G-ZQENY9NS30"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const ADMIN_LIST = [
  "batursadic@gmail.com",
  "mur4t3rdogan1999@gmail.com"
];

export interface InjuryData {
  type: string;
  date: string;
}

export type InjuryMap = Record<string, InjuryData>;

export const saveUserInjuries = async (userId: string, injuries: InjuryMap): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    // { merge: true } ensures we don't accidentally wipe out other user fields (like email or name)
    await setDoc(userRef, { injuries }, { merge: true });
  } catch (error) {
    console.error("Error saving injuries payload to Firestore:", error);
    throw error;
  }
};

export const getUserInjuries = async (userId: string): Promise<InjuryMap | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists() && docSnap.data().injuries) {
      return docSnap.data().injuries as InjuryMap;
    }
  } catch (error) {
    console.error("Error fetching injuries payload from Firestore:", error);
  }
  return null;
};