import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const mockHospitalData = {
  name: 'Kathmandu Medical College Teaching Hospital',
  location: 'Kathmandu',
  doctors: [
    {
      id: 1,
      name: 'Dr. Anup Shrestha',
      specialty: 'Cardiology',
      fee: 800,
      slots: [
        { time: '9:00 AM', booked: false },
        { time: '9:30 AM', booked: true },
        { time: '10:00 AM', booked: false },
        { time: '10:30 AM', booked: false },
        { time: '11:00 AM', booked: true },
        { time: '11:30 AM', booked: false },
      ],
    },
    {
      id: 2,
      name: 'Dr. Sunita Rai',
      specialty: 'General OPD',
      fee: 500,
      slots: [
        { time: '9:00 AM', booked: false },
        { time: '9:30 AM', booked: false },
        { time: '10:00 AM', booked: true },
        { time: '10:30 AM', booked: false },
        { time: '11:00 AM', booked: false },
      ],
    },
    {
      id: 3,
      name: 'Dr. Prakash Thapa',
      specialty: 'Neurology',
      fee: 1000,
      slots: [
        { time: '2:00 PM', booked: false },
        { time: '2:30 PM', booked: true },
        { time: '3:00 PM', booked: false },
        { time: '3:30 PM', booked: false },
      ],
    },
    {
      id: 4,
      name: 'Dr. Meera Gurung',
      specialty: 'Pediatrics',
      fee: 600,
      slots: [
        { time: '4:00 PM', booked: false },
        { time: '4:30 PM', booked: false },
        { time: '5:00 PM', booked: true },
        { time: '5:30 PM', booked: false },
      ],
    },
  ],
}

export default function BookingPage() {
  const { hospitalId } = useParams()
  const navigate = useNavigate()

  const [selectedDoctor, setSelectedDoctor] = useState(mockHospitalData.doctors[0])
  const [selectedSlot, setSelectedSlot] = useState(null)

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor)
    setSelectedSlot(null)
  }

  const handleProceed = () => {
    console.log('Booking selection:', {
      hospitalId,
      doctor: selectedDoctor.name,
      fee: selectedDoctor.fee,
      slot: selectedSlot,
    })
  }

  const canProceed = selectedDoctor && selectedSlot

  return (
    <div className="min-h-svh w-full bg-mist px-4 py-8 md:px-10 pb-32">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/search')}
          className="text-[13px] text-muted hover:text-ink transition"
        >
          ← Back to search
        </button>

        <h1 className="font-display text-[26px] md:text-[30px] text-ink mt-4">
          {mockHospitalData.name}
        </h1>
        <p className="text-[13px] text-muted mt-1">{mockHospitalData.location}</p>

        {/* Doctor selector */}
        <div className="mt-8">
          <h2 className="text-[15px] font-medium text-ink mb-3">Choose a doctor</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            {mockHospitalData.doctors.map((doctor) => {
              const isActive = selectedDoctor.id === doctor.id
              return (
                <button
                  key={doctor.id}
                  onClick={() => handleDoctorSelect(doctor)}
                  className={`flex-1 text-left rounded-xl border p-4 transition ${
                    isActive
                      ? 'border-teal bg-teal/5'
                      : 'border-ink/10 bg-paper hover:border-ink/20'
                  }`}
                >
                  <p className="font-medium text-[14px] text-ink">{doctor.name}</p>
                  <p className="text-[12px] text-muted mt-0.5">{doctor.specialty}</p>
                  <p className="font-token text-[12px] text-ink mt-2">Rs. {doctor.fee}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Time slots */}
        <div className="mt-8">
          <h2 className="text-[15px] font-medium text-ink mb-3">Select a time slot</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {selectedDoctor.slots.map((slot) => {
              const isSelected = selectedSlot === slot.time
              return (
                <button
                  key={slot.time}
                  disabled={slot.booked}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`rounded-lg py-2.5 text-[13px] font-token transition ${
                    slot.booked
                      ? 'bg-ink/5 text-muted/50 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-teal text-paper'
                      : 'bg-paper border border-ink/15 text-ink hover:border-teal'
                  }`}
                >
                  {slot.booked ? 'Booked' : slot.time}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-paper border-t border-ink/10 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] text-ink font-medium">{selectedDoctor.name}</p>
            <p className="text-[12px] text-muted">
              Rs. {selectedDoctor.fee}
              {selectedSlot ? ` · ${selectedSlot}` : ' · No slot selected'}
            </p>
          </div>
          <button
            onClick={handleProceed}
            disabled={!canProceed}
            className={`px-5 py-2.5 rounded-lg text-[14px] font-medium transition ${
              canProceed
                ? 'bg-teal text-paper hover:bg-teal-deep'
                : 'bg-ink/10 text-muted cursor-not-allowed'
            }`}
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  )
}