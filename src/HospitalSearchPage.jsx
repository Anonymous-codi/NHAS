import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const mockHospitals = [
  {
    id: 1,
    name: 'Kathmandu Medical College Teaching Hospital',
    location: 'Kathmandu',
    specialties: ['Cardiology', 'General OPD', 'Neurology'],
    verified: true,
    nextSlot: 'Today, 2:30 PM',
    fee: 800,
  },
  {
    id: 2,
    name: 'Tribhuvan University Teaching Hospital',
    location: 'Kathmandu',
    specialties: ['General OPD', 'Orthopedics'],
    verified: true,
    nextSlot: 'Tomorrow, 10:00 AM',
    fee: 600,
  },
  {
    id: 3,
    name: 'Nepal Medical College Teaching Hospital',
    location: 'Kathmandu',
    specialties: ['Cardiology', 'Pediatrics'],
    verified: true,
    nextSlot: 'Today, 4:15 PM',
    fee: 900,
  },
  {
    id: 4,
    name: 'BP Koirala Institute of Health Sciences',
    location: 'Dharan',
    specialties: ['General OPD', 'Dermatology', 'ENT'],
    verified: true,
    nextSlot: 'Tomorrow, 11:30 AM',
    fee: 700,
  },
  {
    id: 5,
    name: 'Patan Academy of Health Sciences',
    location: 'Lalitpur',
    specialties: ['General OPD', 'Gynecology'],
    verified: false,
    nextSlot: 'Today, 3:00 PM',
    fee: 650,
  },
  {
    id: 6,
    name: 'Bir Hospital',
    location: 'Kathmandu',
    specialties: ['Cardiology', 'General OPD', 'Surgery'],
    verified: true,
    nextSlot: 'Tomorrow, 2:00 PM',
    fee: 550,
  },
];

const locations = ['All locations', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Dharan'];
const specialties = [
  'All specialties',
  'General OPD',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'ENT',
  'Gynecology',
  'Surgery',
];

export default function HospitalSearchPage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All locations');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All specialties');

  const filteredHospitals = mockHospitals.filter((hospital) => {
    const matchesSearch =
      searchText === '' ||
      hospital.name.toLowerCase().includes(searchText.toLowerCase()) ||
      hospital.specialties.some((spec) =>
        spec.toLowerCase().includes(searchText.toLowerCase())
      );

    const matchesLocation =
      selectedLocation === 'All locations' ||
      hospital.location === selectedLocation;

    const matchesSpecialty =
      selectedSpecialty === 'All specialties' ||
      hospital.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-mist">
      {/* Header */}
      <div className="bg-paper border-b border-ink/15 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-sm font-sans font-medium text-muted mb-2">
            Swasthya Sewa
          </p>
          <h1 className="font-display text-3xl font-bold text-ink">
            Find a hospital near you
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-paper rounded-lg p-6 shadow-sm mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by hospital name or specialty..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-3 bg-mist border border-ink/15 rounded-lg font-sans text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans font-medium text-ink mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 bg-mist border border-ink/15 rounded-lg font-sans text-ink focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-sans font-medium text-ink mb-2">
                Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-2 bg-mist border border-ink/15 rounded-lg font-sans text-ink focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm font-sans text-muted">
            {filteredHospitals.length}{' '}
            {filteredHospitals.length === 1 ? 'hospital' : 'hospitals'} found
          </p>
        </div>

        {/* Hospital Results */}
        {filteredHospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-paper rounded-lg shadow-sm border border-ink/15 p-6 hover:shadow-md transition-shadow"
              >
                {/* Hospital Name and Verified Badge */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-sans font-bold text-lg text-ink flex-1">
                    {hospital.name}
                  </h3>
                  {hospital.verified && (
                    <span className="ml-3 inline-block bg-teal text-white text-xs font-sans font-medium px-3 py-1 rounded-full whitespace-nowrap">
                      Verified
                    </span>
                  )}
                </div>

                {/* Location */}
                <p className="text-sm font-sans text-muted mb-4 flex items-center">
                  📍 {hospital.location}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hospital.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="inline-block bg-mist border border-ink/15 text-ink text-xs font-sans font-medium px-3 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Next Slot and Fee */}
                <div className="flex items-center justify-between mb-6 pt-4 border-t border-ink/15">
                  <p className="text-sm font-token text-ink">
                    Next slot: {hospital.nextSlot}
                  </p>
                  <p className="text-sm font-sans font-medium text-ink">
                    Rs. {hospital.fee}
                  </p>
                </div>

                {/* View Slots Button */}
                <button 
                 onClick={() => navigate(`/book/${hospital.id}`)}
                 className="w-full bg-teal text-white py-2 rounded-lg font-sans font-medium hover:bg-teal-deep active:bg-teal-deep transition-colors">
                  View slots
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-paper rounded-lg p-12 text-center">
            <p className="font-sans text-muted mb-2">
              No hospitals match your search
            </p>
            <p className="text-sm font-sans text-muted">
              Try adjusting your filters and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}