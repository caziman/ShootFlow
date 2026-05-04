'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleAuth = async (e: any) => {
    e.preventDefault()
    setMessage(mode === 'login' ? 'Signing in...' : 'Creating account...')

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage('Invalid email or password.')
      } else {
        router.push('/dashboard')
      }
    }

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Account created. Check your email to confirm.')
      }
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #2a2118 0%, #0b0b0b 45%, #050505 100%)',
        color: '#f8f1e7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'Georgia, serif',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'rgba(15, 15, 15, 0.92)',
          border: '1px solid rgba(201, 169, 106, 0.35)',
          borderRadius: 28,
          padding: 36,
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <p
            style={{
              color: '#c9a96a',
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontSize: 12,
              marginBottom: 12,
            }}
          >
            ShootFlow Studio
          </p>

          <h1 style={{ fontSize: 38, fontWeight: 400, marginBottom: 10 }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>

          <p style={{ color: '#b8aa98', fontSize: 15 }}>
            {mode === 'login'
              ? 'Access your bookings and manage your sessions.'
              : 'Start managing your photography workflow.'}
          </p>
        </div>

        <form onSubmit={handleAuth}>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={inputStyle}
            required
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: 16,
              borderRadius: 999,
              border: '1px solid #c9a96a',
              background: 'linear-gradient(135deg, #c9a96a, #8b6f3e)',
              color: '#090909',
              fontWeight: 800,
              fontSize: 15,
              cursor: 'pointer',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginTop: 10,
            }}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login')
            setMessage('')
          }}
          style={{
            width: '100%',
            marginTop: 20,
            background: 'transparent',
            color: '#c9a96a',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          {mode === 'login'
            ? 'Create an account'
            : 'Back to sign in'}
        </button>

        {message && (
          <p
            style={{
              marginTop: 18,
              textAlign: 'center',
              color:
                message.includes('created')
                  ? '#d8c69b'
                  : message.includes('Signing') || message.includes('Creating')
                  ? '#c9a96a'
                  : '#fca5a5',
            }}
          >
            {message}
          </p>
        )}
      </section>
    </main>
  )
}

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  color: '#d8c69b',
  fontWeight: 700,
  letterSpacing: 0.5,
}

const inputStyle = {
  width: '100%',
  padding: 15,
  marginBottom: 18,
  borderRadius: 14,
  border: '1px solid rgba(201, 169, 106, 0.28)',
  background: '#080808',
  color: '#f8f1e7',
  outline: 'none',
}