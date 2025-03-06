import { useState } from 'react';

function Form1() {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    textarea: "",
    errors: {
      email: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validate = () => {
    const errors = {};
    if (!/^\S+@\S+$/.test(form.email)) errors.email = "Invalid email";
    setForm((prevForm) => ({ ...prevForm, errors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="contactAgent">Contact Agent</h1>
      <div>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            placeholder="Your Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
          />
          {form.errors.email && <span>{form.errors.email}</span>}
        </label>
      </div>
      <br />
      <div>
        <label>
          Your Message:
          <textarea
            name="textarea"
            placeholder="Write Your Message"
            value={form.textarea}
            onChange={handleChange}
          />
        </label>
      </div>
      <br />
      <div className="group">
        <button type="submit">Submit</button>
        <button type="button">Book</button>
      </div>
    </form>
  );
}

export default Form1;
