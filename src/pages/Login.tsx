import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <main className="border border-gray-300 w-[400px] shadow-lg">
        <div className="flex justify-center items-center border-b py-3">
          <Logo />
        </div>
        <div className="p-5">
          <LoginForm isAdmin={true} />
        </div>
      </main>
    </div>
  );
};

export default Login;
