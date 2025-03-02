import { useState } from 'react';

function BrokerForm() {
  const [type, setType] = useState('register');
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    terms: true,
    errors: {
      email: '',
      password: ''
    }
  });

  const handleChange = (e) => {
    const { name, value, checked, type: inputType } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: inputType === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const errors = {};
    if (!/^\S+@\S+$/.test(form.email)) errors.email = 'Invalid email';
    if (form.password.length <= 6) errors.password = 'Password should include at least 6 characters';
    setForm((prevForm) => ({ ...prevForm, errors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    // Handle form submission logic
  };

  const toggleType = () => setType((prevType) => (prevType === 'register' ? 'login' : 'register'));

  return (
    <div>
      <h2>{type === 'register' ? 'Register Property' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </label>
          </div>
        )}
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="hello@example.com"
            />
            {form.errors.email && <span>{form.errors.email}</span>}
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
            />
            {form.errors.password && <span>{form.errors.password}</span>}
          </label>
        </div>
        {type === 'register' && (
          <div>
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              I accept terms and conditions
            </label>
          </div>
        )}
        <div>
          <button type="button" onClick={toggleType}>
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </button>
          <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
        </div>
      </form>
    </div>
  );
}

export default BrokerForm;
