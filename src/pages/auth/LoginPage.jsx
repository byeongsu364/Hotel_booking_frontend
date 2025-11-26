import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import AuthImageWrap from "../../components/auth/AuthImageWrap";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imageList.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") setRemember(checked);
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        formData,
        { withCredentials: true }
      );

      const { token } = res.data || {};
      if (!token) throw new Error("토큰 없음");

      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <div className="auth-layout-page">
      <div className="auth-layout-container">
        <div className="auth-layout-content">
          <div className="auth-layout-form-section">
            <LoginForm />
          </div>
          <div className="auth-layout-image-section">
            <AuthImageWrap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
