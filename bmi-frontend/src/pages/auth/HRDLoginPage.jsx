import React, { useState } from "react";
import api from "../../axios";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const HRDLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const res = await api.post("/login", { email, password });

      console.log("Respon Server:", res.data);

      const token = res.data.token || res.data.access_token;
      const user = res.data.user || res.data.data;

      if (!token) {
        setErrors({
          general: "Login sukses, tapi server tidak mengirimkan token!",
        });
        return;
      }

      if (user?.role !== "hrd") {
        setErrors({
          general: "Akses Ditolak! Akun ini bukan administrator HRD.",
        });
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user_name", user.name);

      console.log("✅ Token berhasil disimpan ke storage.");

      navigate("/dashboard/hrd");
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      setErrors({
        general: err.response?.data?.message || "Email atau Password salah!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 p-10 rounded-[40px] border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[100px] rounded-full"></div>

        <div className="text-center mb-10 relative z-10">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-5 flex items-center justify-center shadow-2xl shadow-blue-600/20">
            <span className="text-white font-black text-3xl">B</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            BMI Internal
          </h2>
          <p className="text-slate-500 text-xs font-bold mt-1 tracking-widest">
            HUMAN RESOURCES PORTAL
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
              Email Kantor
            </label>
            <input
              required
              type="email"
              placeholder="hrd@bmi.co.id"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-blue-600 transition-all shadow-inner"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
              Kata Sandi
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-blue-600 transition-all shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errors.general && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              <AlertCircle size={16} />
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-2xl hover:from-blue-500 transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-sm active:scale-95 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Otentikasi..." : "Masuk ke Dashboard"}
          </button>
        </form>

        <p className="text-center text-slate-700 text-[10px] mt-10 font-bold tracking-widest uppercase">
          © 2026 PT Bumi Menara Internusa
        </p>
      </div>
    </div>
  );
};

export default HRDLoginPage;
