   import { useNavigate } from 'react-router-dom'
   import { useState } from 'react';

function Field({ label, type = 'text', placeholder, name, autoComplete }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-sans font-medium text-ink mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-ink bg-white focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
      />
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
     navigate('/search');
  };

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-paper rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-ink mb-1">
            Swasthya Sewa
          </h1>
          <p className="text-sm text-muted">National Health Access System</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-8">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 px-4 rounded-full font-sans font-medium transition-all ${
              mode === 'login'
                ? 'bg-paper text-ink shadow-md'
                : 'text-muted bg-transparent'
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 px-4 rounded-full font-sans font-medium transition-all ${
              mode === 'register'
                ? 'bg-paper text-ink shadow-md'
                : 'text-muted bg-transparent'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          {mode === 'register' && (
            <Field
              label="Full name"
              type="text"
              placeholder="As per citizenship / ID"
              name="fullName"
            />
          )}

          <Field
            label="Mobile number"
            type="tel"
            placeholder="98XXXXXXXX"
            name="mobile"
            autoComplete="tel"
          />

          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            name="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />

          {mode === 'login' && (
            <div className="text-right mb-6">
              <button
                type="button"
                className="text-sm text-teal hover:text-teal-deep font-sans font-medium"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-teal text-white py-3 rounded-lg font-sans font-medium hover:bg-teal-deep active:bg-teal-deep transition-colors"
          >
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        {/* Auth Mode Toggle */}
        <div className="text-center text-sm font-sans text-muted">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-teal hover:text-teal-deep font-medium"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-teal hover:text-teal-deep font-medium"
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}