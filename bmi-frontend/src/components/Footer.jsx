import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bmi-navy text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img src="/logo-bmi.png" alt="BMI Logo" className="h-12 w-auto mb-4" />
            <p className="text-slate-300 text-sm">
              PT Bumi Menara Internusa - Perusahaan pengolahan dan ekspor seafood terkemuka di Indonesia dengan standar internasional.
            </p>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="/" className="hover:text-white transition">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Lowongan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Sumber Daya */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Sumber Daya</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Tanya Jawab
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Syarat Layanan
                </a>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Jl. Industri, Bekasi, Jawa Barat, Indonesia</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>recruitment@bmi.co.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <p className="text-center text-sm text-slate-300">
            © 2024 PT Bumi Menara Internusa. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
