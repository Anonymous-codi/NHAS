import { useLocation, useNavigate } from 'react-router-dom'

export default function DigitalPassPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const pass = state || {
    hospitalName: 'Kathmandu Medical College Teaching Hospital',
    doctorName: 'Dr. Anup Shrestha',
    specialty: 'Cardiology',
    fee: 800,
    slot: '9:00 AM',
    appointmentId: 'NHAS-2317',
    paymentMethod: 'eSewa',
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-svh w-full bg-mist px-4 py-8 md:px-10 flex flex-col items-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center mx-auto">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#fdfcf9"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="font-display text-[24px] text-ink mt-3">Appointment confirmed</h1>
          <p className="text-[13px] text-muted mt-1">
            Show this pass at the hospital front desk — no need to queue.
          </p>
        </div>

        <div className="bg-teal-deep text-paper rounded-2xl overflow-hidden shadow-[0_20px_40px_-20px_rgba(11,46,42,0.4)]">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-token text-[10px] uppercase tracking-[0.14em] text-paper/50">
                  Digital appointment pass
                </p>
                <p className="font-display text-[19px] mt-1">{pass.hospitalName}</p>
              </div>
              <span className="font-token text-[10px] border border-paper/30 rounded-full px-2.5 py-1 text-paper/70 whitespace-nowrap">
                verified
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="font-token text-[10px] text-paper/50 uppercase tracking-[0.12em]">
                  Patient
                </p>
                <p className="text-[14px] mt-0.5">Citizen (you)</p>
              </div>
              <div>
                <p className="font-token text-[10px] text-paper/50 uppercase tracking-[0.12em]">
                  Doctor
                </p>
                <p className="text-[14px] mt-0.5">{pass.doctorName}</p>
              </div>
              <div>
                <p className="font-token text-[10px] text-paper/50 uppercase tracking-[0.12em]">
                  Department
                </p>
                <p className="text-[14px] mt-0.5">{pass.specialty}</p>
              </div>
              <div>
                <p className="font-token text-[10px] text-paper/50 uppercase tracking-[0.12em]">
                  Date
                </p>
                <p className="text-[14px] mt-0.5">{today}</p>
              </div>
            </div>
          </div>

          <div className="relative border-t border-dashed border-paper/25 mx-6" />

          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-token text-[10px] text-paper/50 uppercase tracking-[0.12em]">
                Appointment ID
              </p>
              <p className="font-token text-[22px] tracking-[0.06em] mt-0.5">
                {pass.appointmentId}
              </p>
            </div>
            <div className="text-right">
              <p className="font-token text-[10px] text-paper/50 uppercase tracking-[0.12em]">
                Time slot
              </p>
              <p className="font-token text-[18px] mt-0.5">{pass.slot}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-paper rounded-xl border border-ink/10 p-4 flex items-center justify-between">
          <div>
            <p className="text-[13px] text-muted">Paid via {pass.paymentMethod}</p>
            <p className="text-[12px] text-muted/70 mt-0.5">Rs. {pass.fee} · Payment successful</p>
          </div>
          <span className="text-[11px] bg-teal/10 text-teal font-medium px-2.5 py-1 rounded-full">
            Paid
          </span>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => window.print()}
            className="flex-1 border border-ink/15 text-ink text-[14px] font-medium py-2.5 rounded-lg hover:bg-paper transition"
          >
            Print / Save pass
          </button>
          <button
            onClick={() => navigate('/search')}
            className="flex-1 bg-teal text-paper text-[14px] font-medium py-2.5 rounded-lg hover:bg-teal-deep transition"
          >
            Book another
          </button>
        </div>
      </div>
    </div>
  )
}