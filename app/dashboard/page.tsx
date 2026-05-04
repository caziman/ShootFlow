'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadBookings = async () => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    setBookings(data || [])
    setLoading(false)
  }

  const updateStatus = async (id: number, newStatus: string) => {
    await supabase.from('bookings').update({ Status: newStatus }).eq('id', id)
    loadBookings()
  }

  const deleteBooking = async (id: number) => {
    if (!confirm('Delete this booking?')) return
    await supabase.from('bookings').delete().eq('id', id)
    loadBookings()
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push('/login')
      } else {
        loadBookings()
      }
    }

    checkUser()
  }, [router])

  const statusStyle = (status: string) => {
    if (status === 'approved') return { background: '#123524', color: '#d8c69b' }
    if (status === 'canceled') return { background: '#3b1111', color: '#f4b7a8' }
    return { background: '#3a2b13', color: '#c9a96a' }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #2a2118 0%, #0b0b0b 45%, #050505 100%)',
        color: '#f8f1e7',
        padding: 30,
        fontFamily: 'Georgia, serif',
      }}
    >
      <section style={{ maxWidth: 1150, margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 34,
            gap: 20,
          }}
        >
          <div>
            <p
              style={{
                color: '#c9a96a',
                letterSpacing: 4,
                textTransform: 'uppercase',
                fontSize: 13,
                marginBottom: 10,
              }}
            >
              ShootFlow Studio
            </p>

            <h1 style={{ fontSize: 44, fontWeight: 400, marginBottom: 8 }}>
              Studio Dashboard
            </h1>

            <p style={{ color: '#b8aa98' }}>
              Review, approve, and manage your booking requests.
            </p>
          </div>

          <button
            onClick={logout}
            style={{
              padding: '12px 18px',
              borderRadius: 999,
              border: '1px solid rgba(201, 169, 106, 0.45)',
              background: 'transparent',
              color: '#c9a96a',
              cursor: 'pointer',
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Logout
          </button>
        </header>

        <div
          style={{
            background: 'rgba(15, 15, 15, 0.92)',
            border: '1px solid rgba(201, 169, 106, 0.3)',
            borderRadius: 26,
            padding: 26,
            marginBottom: 24,
            boxShadow: '0 25px 70px rgba(0,0,0,0.45)',
          }}
        >
          <p style={{ color: '#c9a96a', letterSpacing: 3, textTransform: 'uppercase', fontSize: 12 }}>
            Overview
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 400, marginTop: 8 }}>
            {bookings.length} Booking Request{bookings.length === 1 ? '' : 's'}
          </h2>
        </div>

        {loading && <p style={{ color: '#c9a96a' }}>Loading bookings...</p>}

        {!loading && bookings.length === 0 && (
          <div
            style={{
              background: 'rgba(15, 15, 15, 0.92)',
              border: '1px solid rgba(201, 169, 106, 0.3)',
              borderRadius: 26,
              padding: 36,
              textAlign: 'center',
              color: '#b8aa98',
            }}
          >
            No bookings yet.
          </div>
        )}

        <div style={{ display: 'grid', gap: 20 }}>
          {bookings.map((booking) => (
            <div
              key={booking.id}
              style={{
                background: 'rgba(15, 15, 15, 0.92)',
                border: '1px solid rgba(201, 169, 106, 0.3)',
                borderRadius: 26,
                padding: 28,
                boxShadow: '0 25px 70px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                  marginBottom: 22,
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <h2 style={{ fontSize: 30, fontWeight: 400, marginBottom: 8 }}>
                    {booking.Client_Name}
                  </h2>
                  <p style={{ color: '#b8aa98' }}>{booking.Shoot_Type}</p>
                </div>

                <span
                  style={{
                    ...statusStyle(booking.Status),
                    padding: '8px 14px',
                    borderRadius: 999,
                    textTransform: 'capitalize',
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 0.8,
                  }}
                >
                  {booking.Status || 'pending'}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 14,
                  marginBottom: 20,
                  color: '#d8d0c2',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                <p><strong style={{ color: '#c9a96a' }}>Email:</strong> {booking.Email}</p>
                <p><strong style={{ color: '#c9a96a' }}>Phone:</strong> {booking.Phone}</p>
                <p><strong style={{ color: '#c9a96a' }}>Date:</strong> {booking.Shoot_Date}</p>
                <p><strong style={{ color: '#c9a96a' }}>Location:</strong> {booking.Location}</p>
                <p><strong style={{ color: '#c9a96a' }}>Budget:</strong> ${booking.Budget}</p>
              </div>

              <div
                style={{
                  background: '#070707',
                  border: '1px solid rgba(201, 169, 106, 0.18)',
                  borderRadius: 18,
                  padding: 16,
                  marginBottom: 20,
                  color: '#d8d0c2',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                <strong style={{ color: '#c9a96a' }}>Session Vision:</strong>
                <p style={{ marginTop: 8 }}>{booking.Notes || 'No notes added.'}</p>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={() => updateStatus(booking.id, 'approved')} style={buttonStyle('#c9a96a', '#090909')}>
                  Approve
                </button>

                <button onClick={() => updateStatus(booking.id, 'canceled')} style={buttonStyle('#7f1d1d', '#f8f1e7')}>
                  Cancel
                </button>

                <button onClick={() => deleteBooking(booking.id)} style={buttonStyle('#1f1f1f', '#d8c69b')}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function buttonStyle(background: string, color: string) {
  return {
    padding: '11px 16px',
    borderRadius: 999,
    border: '1px solid rgba(201, 169, 106, 0.3)',
    background,
    color,
    cursor: 'pointer',
    fontWeight: 800,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  }
}