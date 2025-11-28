import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import FindPasswordPage from "./pages/auth/FindPasswordPage";
import EmailAuth from "./pages/auth/EmailAuth";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import HomePage from "./pages/home/HomePage";
import SearchLayout from "./components/layouts/SearchLayout";
import SearchPage from "./pages/search/SearchPage";
import HotelDetailPage from "./pages/hotel/HotelDetailPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  const location = useLocation();  // ← 현재 URL 가져오기

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchLayout />}>
          <Route index element={<SearchPage />} />
        </Route>
        <Route path="/hotels/:hotelId" element={<HotelDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 비밀번호 찾기 (이메일 입력 화면) */}
        <Route path="/findpassword" element={<FindPasswordPage />} />

        {/* 이메일 인증 */}
        <Route path="/emailauth" element={<EmailAuth />} />

        {/* 새 비밀번호 설정 */}
        <Route path="/resetpassword" element={<ResetPasswordPage />} />  {/* 🔥 핵심 */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
