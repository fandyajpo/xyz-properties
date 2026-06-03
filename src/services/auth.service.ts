import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from './firebase/config'

export const authService = {
  async login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  },

  async logout() {
    return signOut(auth)
  },

  async resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
  },

  onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback)
  },
}

// Demo auth context helper
export const DEMO_USER = {
  uid: 'inv_michael_anderson_001',
  email: 'investor@xyzproperties.com',
  displayName: 'Michael Anderson',
}
