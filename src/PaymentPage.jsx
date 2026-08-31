import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const paymentMethods = [
  { id: 'esewa', name: 'eSewa', note: 'Pay via eSewa wallet' },
  { id: 'khalti', name: 'Khalti', note: 'Pay via Khalti wallet' },
  { id: 'card', name: 'Debit / Credit Card', note: 'Visa, Mastercard, UnionPay' },
]

function generateAppointmentId() {
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `NHAS-${rand}`
}

export default function PaymentPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [selectedMethod, setSelectedMethod] = useState('esewa')
  const [isProcessing, setIsProcessing] = useState(false)

  const booking = state || {
    hospitalName: 'Kathmandu Medical College Teaching Hospital',
    hospitalId: '1',
    doctorName: 'Dr. Anup Shrestha',
    specialty: 'Cardiology',
    fee: 800,
    slot: '9:00 AM',
  }

  const handlePay = () => {
    setIsProcessing(true)
    setTimeout(() => {
      navigate('/pass', {
        state: {
          ...booking,
          appointmentId: generateAppointmentId(),
          paymentMethod: paymentMethods.find((m) => m.id === selectedMethod).name,
        },
      })
    }, 1200)
  }

  return (
    <div className="min-h-svh w-full bg-mist px-4 py-8 md:px-10">
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-[13px] text-muted hover:text-ink transition"
        >
          ← Back to slot selection
        </button>

        <h1 className="font-display text-[26px] text-ink mt-4">Confirm & pay</h1>
        <p className="text-[13px] text-muted mt-1">
          Review your appointment before completing payment.
        </p>

        <div className="mt-6 bg-paper rounded-xl border border-ink/10 p-5">
          <p className="font-token text-[11px] uppercase tracking-[0.1em] text-muted">
            Appointment summary
          </p>
          <p className="font-display text-[18px] text-ink mt-2">{booking.hospitalName}</p>

          <div className="mt-4 space-y-2.5 text-[14px]">
            <div className="flex justify-between">
              <span className="text-muted">Doctor</span>
              <span className="text-ink font-medium">{booking.doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Specialty</span>
              <span className="text-ink">{booking.specialty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Time slot</span>
              <span className="text-ink font-token">{booking.slot}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-dashed border-ink/15 flex justify-between items-center">
            <span className="text-[14px] text-muted">Consultation fee</span>
            <span className="text-[20px] font-display text-ink">Rs. {booking.fee}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-[15px] font-medium text-ink mb-3">Choose payment method</h2>
          <div className="space-y-2.5">
            {paymentMethods.map((method) => {
              const isActive = selectedMethod === method.id
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center justify-between text-left rounded-lg border px-4 py-3 transition ${
                    isActive
                      ? 'border-teal bg-teal/5'
                      : 'border-ink/10 bg-paper hover:border-ink/20'
                  }`}
                >
                  <div>
                    <p className="text-[14px] font-medium text-ink">{method.name}</p>
                    <p className="text-[12px] text-muted mt-0.5">{method.note}</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isActive ? 'border-teal' : 'border-ink/20'
                    }`}
                  >
                    {isActive && <div className="w-2 h-2 rounded-full bg-teal" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-teal text-paper font-medium text-[15px] py-3 rounded-lg mt-6 transition hover:bg-teal-deep disabled:opacity-60"
        >
          {isProcessing ? 'Processing payment…' : `Pay Rs. ${booking.fee}`}
        </button>

        <p className="text-[12px] text-muted text-center mt-3">
          This is a UI demo — no real payment gateway is connected yet.
        </p>
      </div>
    </div>
  )
}