'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut as fbSignOut } from 'firebase/auth'
import { auth, googleProvider, hasConfig } from '../lib/firebase'

const AuthContext = createContext({ user: null, loading: true, signIn: () => {}, signOut: () => {}, firebaseEnabled: false })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!hasConfig || !auth) {
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  async function signIn() {
    if (!auth || !googleProvider) return
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.error('Sign-in error:', err)
    }
  }

  async function signOut() {
    if (!auth) return
    try {
      await fbSignOut(auth)
    } catch (err) {
      console.error('Sign-out error:', err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, firebaseEnabled: hasConfig }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
