import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

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

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  primarySport?: string;
  sportHistory?: string;
  competitionLevel?: string;
  goals?: string;
  preferredProgram?: string;
  emergencyContact?: string;
  injuries?: InjuryMap;
}

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

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
  return null;
};

export const saveUserProfile = async (userId: string, profile: UserProfile): Promise<void> => {
  await setDoc(doc(db, "users", userId), profile, { merge: true });
};

export const queueProfileChangeEmail = async (payload: {
  userId: string;
  to: string;
  changedFields: string[];
}): Promise<void> => {
  await addDoc(collection(db, "mail"), {
    to: payload.to,
    template: {
      name: "profile-change-confirmation",
      data: {
        changedFields: payload.changedFields.join(", "),
      },
    },
    userId: payload.userId,
    createdAt: serverTimestamp(),
  });
};
