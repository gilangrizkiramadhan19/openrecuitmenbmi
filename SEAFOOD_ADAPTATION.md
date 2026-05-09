# BMI Seafood Portal - Adaptation Summary

## Dokumen Referensi
PT Bumi Menara Internusa (BMI) - Perusahaan pengolahan dan ekspor seafood terkemuka dengan fokus pada:
- Food safety & compliance standards internasional (HACCP, ISO 22000, FSSC 22000)
- Operasional di Lampung, Surabaya, dan Makassar
- Standar export kualitas global
- Technology-driven manufacturing
- Sustainability & responsible practices

---

## Konten yang Sudah Disesuaikan

### 1. Company Information (lib/constants.ts)
- **Before**: Generic company portal
- **After**: Seafood-specific company data
  - Description: "Perusahaan pengolahan dan ekspor seafood terkemukan dengan standar kualitas internasional..."
  - Industry: "Seafood Processing & Export"
  - Facilities: Lampung, Surabaya, Makassar
  - Employees: 2500+ talenta profesional

### 2. Job Positions (lib/constants.ts) - New Divisions
Menambahkan 8 divisi industri seafood-spesifik:
- Quality Control & Food Safety
- Production & Manufacturing  
- Supply Chain & Logistics
- Export & Trade
- Teknologi & Innovation
- Operational Management
- Human Resources
- Finance & Accounting

12 posisi pekerjaan seafood-relevant:
- Quality Control Staff
- Cold Chain Supervisor
- Production Planning Analyst
- Supply Chain Officer
- ERP Manufacturing Specialist
- IoT Cold Storage Specialist
- Export Documentation Staff
- Food Safety Compliance Officer
- Production Manager
- Logistics Coordinator
- Procurement Specialist
- Food Quality Technician

### 3. Hero Section (components/sections/hero.tsx)
```
Headline Sebelum: "Temukan Jalan Karirmu Bersama BMI"
Headline Sesudah: "Bangun Karir Global dalam Industri Seafood"

Tagline Sebelum: "Bergabunglah dengan ribuan talenta berbakat..."
Tagline Sesudah: "Bergabunglah dengan PT Bumi Menara Internusa, perusahaan 
pengolahan dan ekspor seafood terkemuka. Kami menawarkan peluang karir yang 
menantang dalam industri food processing dengan standar internasional..."

Stats:
- 24+ Tahun Pengalaman (dari 25+)
- 3 Lokasi Operasional (dari 15+ Divisi)
- 2500+ Talenta Profesional (dari 5000+)
```

### 4. Job Listings (components/sections/job-listings.tsx)
6 posisi dengan deskripsi seafood-specific:
1. **Quality Control Staff** - Lampung - Fresh Graduate
   - "Memastikan standar kualitas produk seafood sesuai regulasi internasional..."
2. **Cold Chain Supervisor** - Surabaya - Berpengalaman
   - "Supervisi operasi cold storage dan cold chain management..."
3. **Production Planning Analyst** - Makassar - Berpengalaman
   - "Analisis dan optimalisasi produksi seafood processing..."
4. **Supply Chain Officer** - Lampung - Berpengalaman
   - "Kelola logistik, procurement, dan supply chain..."
5. **Food Safety Compliance Officer** - Lampung - Berpengalaman
   - "Memastikan compliance dengan standar food safety internasional..."
6. **ERP Manufacturing Specialist** - Surabaya - Berpengalaman
   - "Implementasi dan maintenance ERP systems untuk manufacturing..."

### 5. About Section (components/sections/about-bmi.tsx)
```
Values: Diganti dari generic menjadi seafood-spesifik
1. Food Safety → "Komitmen pada keamanan pangan dengan standar internasional"
2. Sustainability → "Pengolahan seafood yang bertanggung jawab terhadap lingkungan"
3. Production Efficiency → "Teknologi manufaktur modern dan cold chain management"

Floating Card:
Sebelum: "Pengembangan karir yang berkelanjutan..."
Sesudah: "Ekspor produk seafood berkualitas premium ke lebih dari 30 negara..."
```

### 6. Career Paths (components/sections/career-paths.tsx)
Semua path descriptions updated dengan konteks seafood:
1. **Fresh Graduate Program**
   - "Program pengembangan bagi lulusan baru dalam industri seafood processing, production, dan quality control"
2. **Profesional Berpengalaman**
   - "Profesional berpengalaman dalam manufacturing, supply chain, dan technology advancement"
3. **Program Magang & PKL**
   - "Program praktik industri untuk mahasiswa di bidang production planning, QC, dan logistics"
4. **Management Development Program**
   - "Program pengembangan pemimpin untuk advanced professionals yang akan memimpin tim operations..."

### 7. Company Culture (components/sections/company-culture.tsx)
4 core values diganti dengan seafood-industry focus:
1. **Tim Multinasional** - Bekerja dengan tim global dalam operasional seafood
2. **Food Safety Culture** - Budaya keamanan pangan adalah prioritas utama
3. **Inovasi Teknologi** - Cold chain, IoT manufacturing, ERP systems
4. **Sustainability Commitment** - Komitmen terhadap sustainable seafood practices

Gallery items updated:
- Production Facility Operations
- Cold Storage Management
- Quality Control Lab
- Team Collaboration
- Training & Development
- Export Operations

### 8. Testimonials (components/sections/testimonials.tsx)
4 employee testimonials dari posisi seafood-specific:
1. **Budi Santoso** - Quality Control Supervisor (Lampung)
   - "Standar food safety yang ketat membuat saya berkembang..."
2. **Siti Nurhaliza** - Supply Chain Manager (Surabaya)
   - "Kesempatan bekerja dengan supply chain global di industri seafood..."
3. **Ahmad Wijaya** - IoT Cold Storage Specialist (Makassar)
   - "Inovasi teknologi di BMI sangat advanced. Saya berkesempatan bekerja dengan IoT systems..."
4. **Dina Handayani** - Production Planning Analyst (Lampung)
   - "BMI peduli pada profit, sustainability, dan food safety..."

### 9. Articles (components/sections/articles.tsx)
3 artikel dengan topik seafood-industry:
1. **Food Safety Standards dalam Seafood Processing Global**
   - Focus: HACCP, ISO 22000, FSSC 22000
2. **Inovasi IoT dalam Cold Chain Management Seafood**
   - Focus: Teknologi cold storage, efisiensi produk
3. **Sustainability & Responsible Seafood Export Practices**
   - Focus: Sustainable fishing, responsible practices

### 10. Final CTA (components/sections/cta-final.tsx)
```
Headline: "Bangun Karir Global dalam Seafood Industry"
Body: "Bergabunglah dengan PT Bumi Menara Internusa dan menjadi bagian dari 
pemimpin industri seafood processing dan export global"
```

### 11. Footer (components/layout/footer.tsx)
- Brand description: "PT Bumi Menara Internusa - Pemimpin industri seafood processing..."
- Contact: recruitment@bmi.id
- Locations: Lampung, Surabaya, Makassar

### 12. Navbar (components/layout/navbar.tsx)
✓ Sudah sesuai dengan dokumen
- Home / Beranda
- Kehidupan Kami
- Karir
- Magang & PKL
- Info & Artikel
- Login

### 13. Top Banner (components/layout/top-banner.tsx)
✓ Sudah sesuai dengan dokumen
- "PT Bumi Menara Internusa tidak memungut biaya apapun selama proses recruitment berlangsung."

---

## Summary of Changes

| Komponen | Sebelum | Sesudah | Status |
|----------|---------|---------|--------|
| Company Focus | Generic corporate | Seafood processing & export | ✓ Updated |
| Locations | Jakarta only | Lampung, Surabaya, Makassar | ✓ Updated |
| Employee Count | 10,000+ | 2,500+ | ✓ Updated |
| Job Positions | Tech/Finance focused | Seafood industry specific | ✓ Updated |
| Culture Values | Generic business | Food safety, sustainability, IoT | ✓ Updated |
| Testimonials | Generic roles | QC, Supply Chain, IoT, Production | ✓ Updated |
| Articles | Generic career tips | Food safety, IoT, sustainability | ✓ Updated |
| Hero Section | Generic heading | "Bangun Karir Global dalam Seafood" | ✓ Updated |
| CTA Section | Generic message | Seafood industry positioning | ✓ Updated |

---

## What REMAINS Generic (By Design)

Beberapa aspek tetap generic karena didesain untuk flexibility:
1. **Illustration placeholders** - Ready untuk custom seafood manufacturing imagery
2. **Testimonial avatars** - Menggunakan dicebear SVG (bisa diganti dengan foto real)
3. **Article images** - Menggunakan Unsplash (bisa diganti dengan foto fasilitas real)
4. **Gallery items** - Placeholder colors (bisa diganti dengan foto real)

---

## Build Status
✓ **Build Successful** (0 errors)
✓ **All Components Compiled**
✓ **TypeScript Type-Safe**
✓ **Ready for Deployment**

---

## Next Steps

Untuk mencapai 100% seafood-industry alignment:

### Phase 2 - Visual Assets
- [ ] Generate/add custom seafood facility imagery
- [ ] Create manufacturing/cold storage illustrations
- [ ] Add food safety certification badges
- [ ] Product showcase section

### Phase 3 - Real Backend Integration
- [ ] Connect ke Laravel Sanctum API
- [ ] Real job data dari backend
- [ ] Real testimonials dari database
- [ ] Real articles dari CMS

### Phase 4 - Enhanced Features
- [ ] Job application workflow
- [ ] Candidate dashboard
- [ ] HRD recruitment dashboard
- [ ] Email notifications

---

**Status**: Portal siap untuk production deployment sebagai premium seafood industry career portal! 🚀
