const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="relative flex justify-center text-lg w-full border-2 border-[#50bcdf] font-medium rounded-lg px-4 py-3 cursor-pointer"
      >
        <img
          src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
          alt="google icon"
          className="absolute left-4 w-7"
        />
        <p>구글 로그인</p>
      </button>
    </>
  );
};

export default GoogleLoginButton;
