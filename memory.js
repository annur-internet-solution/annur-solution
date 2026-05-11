// 🧠 NEXORA AI MEMORY CLOUD
// Firebase-based persistent memory system

import { db } from "./firebase.js";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ===============================
// 🧠 CREATE INITIAL MEMORY
// ===============================
export async function initMemory(userId, userData) {
  const ref = doc(db, "ai_memory", userId);

  await setDoc(ref, {
    userId: userId,
    name: userData.name || "Unknown",
    xp: 0,
    level: 1,
    history: [],
    skills: [],
    lastActive: Date.now()
  });

  return true;
}


// ===============================
// 💬 SAVE NEW MEMORY (CHAT / AI)
// ===============================
export async function saveMemory(userId, message) {
  const ref = doc(db, "ai_memory", userId);

  await updateDoc(ref, {
    history: arrayUnion({
      text: message,
      time: Date.now()
    }),
    lastActive: Date.now()
  });
}


// ===============================
// 📖 GET MEMORY
// ===============================
export async function getMemory(userId) {
  const ref = doc(db, "ai_memory", userId);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  } else {
    return null;
  }
}


// ===============================
// 📈 ADD XP (LEARNING SYSTEM)
// ===============================
export async function addXP(userId, amount) {
  const ref = doc(db, "ai_memory", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  let data = snap.data();
  let newXP = (data.xp || 0) + amount;

  let newLevel = Math.floor(newXP / 100) + 1;

  await updateDoc(ref, {
    xp: newXP,
    level: newLevel
  });
}


// ===============================
// 🧠 ADD SKILL
// ===============================
export async function addSkill(userId, skill) {
  const ref = doc(db, "ai_memory", userId);

  await updateDoc(ref, {
    skills: arrayUnion(skill)
  });
}


// ===============================
// 🔁 UPDATE LAST ACTIVITY
// ===============================
export async function updateActivity(userId) {
  const ref = doc(db, "ai_memory", userId);

  await updateDoc(ref, {
    lastActive: Date.now()
  });
}
import {
  initMemory,
  saveMemory,
  getMemory,
  addXP
} from "./memory.js";
await initMemory(user.uid, {
  name: "Nura"
});

await saveMemory(user.uid, "User asked about cybersecurity");

await addXP(user.uid, 50);

let data = await getMemory(user.uid);
console.log(data.history);
