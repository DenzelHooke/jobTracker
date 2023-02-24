const NewUserForm = ({ onSubmit, onChange, formData }) => {
  const submitForm = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <form onSubmit={submitForm} id="register-form" className="form">
        <input
          type="text"
          id="email"
          className="input"
          placeholder="Email"
          onChange={onChange}
        />
        <input
          type="text"
          id="password1"
          className="input"
          placeholder="Create a password"
          onChange={onChange}
        />
        <input
          type="text"
          id="password2"
          className="input"
          placeholder="Confirm password"
          onChange={onChange}
        />
        <button className="button">Create Account</button>
      </form>
    </>
  );
};

export default NewUserForm;
