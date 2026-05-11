import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, Lock, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Nama lengkap sesuai KTP diperlukan";
    if (!formData.email) {
      newErrors.email = "Email diperlukan";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }
    if (!formData.password) {
      newErrors.password = "Password diperlukan";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    }
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Password dan konfirmasi tidak cocok";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
      } else {
        alert(
          data.message ||
            Object.values(data.errors || {}).flat()[0] ||
            "Registrasi gagal",
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 - Email Terkirim
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bmi-navy via-bmi-blue to-bmi-soft">
        <Navbar showAuth={false} />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={60} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-bmi-navy mb-4">
              Email Terkirim
            </h2>
            <p className="text-slate-600 mb-2">
              Kami telah mengirimkan email verifikasi ke
            </p>
            <p className="font-semibold text-bmi-navy mb-6 break-all">
              {formData.email}
            </p>
            <p className="text-sm text-slate-500 mb-8">
              Silakan cek kotak masuk atau spam Anda.
            </p>
            <Button onClick={() => navigate("/login")} className="w-full mb-3">
              Kembali ke Halaman Masuk
            </Button>
            <button
              onClick={() => setStep(1)}
              className="text-bmi-blue hover:underline text-sm font-medium"
            >
              Kirim ulang email
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Step 1 - Form Register
  return (
    <div className="min-h-screen bg-gradient-to-b from-bmi-navy via-bmi-blue to-bmi-soft">
      <Navbar showAuth={false} />

      <div className="relative min-h-[calc(100vh-64px)] py-12 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-bmi-navy to-bmi-blue p-8 text-white">
                <img src="/logo-bmi.png" alt="BMI Logo" className="h-10 mb-6" />
                <h1 className="text-2xl font-bold">Buat Akun Baru</h1>
                <p className="text-white/80 mt-2">
                  Mulai perjalanan karir Anda bersama kami
                </p>
              </div>

              {/* Form */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form fields... (sama seperti sebelumnya) */}
                  {/* ... isi form fullName, email, password, dll ... */}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-bmi-navy to-bmi-blue"
                  >
                    {loading ? "Mendaftarkan Akun..." : "Daftar Sekarang"}
                  </Button>

                  <p className="text-center text-sm text-slate-600">
                    Sudah punya akun?{" "}
                    <Link
                      to="/login"
                      className="text-bmi-blue font-semibold hover:underline"
                    >
                      Masuk di sini
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
