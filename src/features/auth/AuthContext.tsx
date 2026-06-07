import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'

import { auth } from '@/services/firebase/config'
import { dbService } from '@/services/db.service'
import type { Investor } from '@/types/investor.types'

interface AuthContextType {
  user: Investor | null
  firebaseUser: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [user, setUser] = useState<Investor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setFirebaseUser(currentUser)

      if (!currentUser) {
        setUser(null)
        setIsLoading(false)
        return
      }

      setIsLoading(false)

      try {
        const profile = await dbService.getInvestorProfile(
          currentUser.uid
        )
        setUser(profile ?? null)
      } catch (err) {
        console.error('Auth profile fetch error:', err)
      }
    })

    return unsubscribe
  }, [])

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true)

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      return true
    } catch (err) {
      console.error('Firebase Login Error:', err)
      setIsLoading(false)
      return false
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      await signOut(auth)
    } catch (err) {
      console.error('Firebase Logout Error:', err)
    } finally {
      setUser(null)
      setFirebaseUser(null)
      setIsLoading(false)
    }
  }

  const value = useMemo(
    () => ({
      user,
      firebaseUser,
      isAuthenticated: !!firebaseUser,
      isLoading,
      login,
      logout,
    }),
    [user, firebaseUser, isLoading]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }

  return ctx
}