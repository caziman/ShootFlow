'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function BookPage() {
  const [form, setForm] = useState({
    Client_Name: '',
    Email: '',
    Phone: '',
    Shoot_Type: '',
    Shoot_Date: '',
    Location: '',
    Budget: '',
    Notes: '',
  })

  const [message, setMessage] = useState('')

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setMessage('Saving booking...')

    const { error } = await supabase.from('bookings').insert([form])

    if (error) {
      setMessage('Something went wrong. Please try again.')
      return
    }

    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setMessage('Redirecting to secure payment...')

    const checkoutRes = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const checkoutData = await checkoutRes.json()

    if (checkoutData.url) {
      window.location.href = checkoutData.url
    } else {
      setMessage('Booking saved, but payment could not start.')
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #2a2118 0%, #0b0b0b 45%, #050505 100%)',
        color: '#f8f1e7',
        padding: 24,
        fontFamily: 'Georgia, serif',
      }}
    >
      <section style={{ maxWidth: 820, margin: '0 auto', paddingTop: 60 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p
            style={{
              color: '#c9a96a',
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontSize: 13,
              marginBottom: 14,
            }}
          >
            ShootFlow Studio
          </p>

          <h1 style={{ fontSize: 52, marginBottom: 14, fontWeight: 400 }}>
            Reserve Your Session
          </h1>

          <p
            style={{
              color: '#b8aa98',
              fontSize: 18,
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Share your session details, then complete your secure deposit to
            reserve your request.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: 'rgba(15, 15, 15, 0.92)',
            border: '1px solid rgba(201, 169, 106, 0.35)',
            borderRadius: 28,
            padding: 36,
            boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'grid', gap: 20 }}>
            <div>
              <label style={labelStyle}>Client Name</label>
              <input
                name="Client_Name"
                value={form.Client_Name}
                onChange={handleChange}
                placeholder="Your full name"
                style={inputStyle}
                required
              />
            </div>

            <div style={twoColumn}>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  name="Email"
                  type="email"
                  value={form.Email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  name="Phone"
                  value={form.Phone}
                  onChange={handleChange}
                  placeholder="(405) 000-0000"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={twoColumn}>
              <div>
                <label style={labelStyle}>Session Type</label>
                <select
                  name="Shoot_Type"
                  value={form.Shoot_Type}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                >
                  <option value="">Select a session type</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Branding">Branding</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Event">Event</option>
                  <option value="Family">Family</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Preferred Date</label>
                <input
                  name="Shoot_Date"
                  type="date"
                  value={form.Shoot_Date}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div style={twoColumn}>
              <div>
                <label style={labelStyle}>Preferred Location</label>
                <input
                  name="Location"
                  value={form.Location}
                  onChange={handleChange}
                  placeholder="Studio, downtown OKC, venue, etc."
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Estimated Budget</label>
                <input
                  name="Budget"
                  value={form.Budget}
                  onChange={handleChange}
                  placeholder="Example: 350"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Session Vision</label>
              <textarea
                name="Notes"
                value={form.Notes}
                onChange={handleChange}
                placeholder="Tell us the vibe, occasion, number of people, outfit ideas, or anything important."
                style={{
                  ...inputStyle,
                  minHeight: 130,
                  resize: 'vertical',
                }}
              />
            </div>

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
                fontSize: 16,
                cursor: 'pointer',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Submit Booking + Pay Deposit
            </button>
          </div>

          {message && (
            <p
              style={{
                marginTop: 20,
                textAlign: 'center',
                color:
                  message.includes('Redirecting') || message.includes('Saving')
                    ? '#c9a96a'
                    : message.includes('saved')
                    ? '#d8c69b'
                    : '#fca5a5',
              }}
            >
              {message}
            </p>
          )}
        </form>
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
  borderRadius: 14,
  border: '1px solid rgba(201, 169, 106, 0.28)',
  background: '#080808',
  color: '#f8f1e7',
  outline: 'none',
  fontFamily: 'Arial, sans-serif',
}

const twoColumn = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: 20,
}