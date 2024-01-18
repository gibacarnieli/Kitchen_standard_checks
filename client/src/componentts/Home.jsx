import Login from './Login'; // Import your Login component


export default function Home() {
  return (
    <>
      <div className="container">
        {/* Login Form */}
        <div className="mb-4">
          <h2>Login</h2>
          <Login />
        </div>
        </div>
    </>
  );
}
