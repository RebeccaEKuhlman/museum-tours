const Login = () => {
  return (
    <section id="loginView">
      <h2>Login</h2>
      <div class="form-field required">
        <label for="studentName">Username</label>
        <input type="text" id="username" name="username" />
        <label for="department">Password</label>
        <input type="password" id="password" name="password"/>
        <button type="submit" id="submitButton" />
      </div>
    </section>
  );
};

export default Login;