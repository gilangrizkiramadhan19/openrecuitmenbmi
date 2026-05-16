import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Save, User, MapPin, Briefcase, GraduationCap, Link as LinkIcon } from 'lucide-react';
import Navbar from '../../components/Navbar';
import api from '../../axios';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';
import TextAreaField from '../../components/forms/TextAreaField';
import SectionCard from '../../components/forms/SectionCard';
import UploadPhoto from '../../components/forms/UploadPhoto';
import lampungData from '../../data/wilayah/lampung.json';

const schema = yup.object().shape({
  full_name: yup.string().required('Nama lengkap wajib diisi'),
  ktp_number: yup.string().length(16, 'KTP harus 16 digit').required('Nomor KTP wajib diisi'),
  phone: yup.string().required('Nomor HP wajib diisi'),
  alt_phone: yup.string().nullable(),
  birth_place: yup.string().required('Tempat lahir wajib diisi'),
  birth_date: yup.date().typeError('Tanggal tidak valid').required('Tanggal lahir wajib diisi'),
  gender: yup.string().required('Jenis kelamin wajib dipilih'),
  religion: yup.string().required('Agama wajib dipilih'),
  marital_status: yup.string().required('Status pernikahan wajib dipilih'),
  last_education: yup.string().required('Pendidikan terakhir wajib dipilih'),
  
  address_ktp: yup.string().required('Alamat lengkap wajib diisi'),
  province: yup.string().required('Provinsi wajib dipilih'),
  city: yup.string().required('Kota/Kabupaten wajib dipilih'),
  district: yup.string().required('Kecamatan wajib dipilih'),
  sub_district: yup.string().required('Kelurahan wajib dipilih'),
  rt_rw: yup.string().nullable(),
  postal_code: yup.string().required('Kode pos wajib diisi'),

  education: yup.array().of(
    yup.object().shape({
      school_name: yup.string().required('Nama sekolah wajib diisi'),
      degree: yup.string().required('Gelar/Tingkat wajib diisi'),
      major: yup.string().required('Jurusan wajib diisi'),
      start_year: yup.string().required('Tahun masuk wajib diisi'),
      end_year: yup.string().required('Tahun lulus wajib diisi')
    })
  ).min(1, 'Minimal 1 riwayat pendidikan wajib diisi'),

  noExperience: yup.boolean(),
  work: yup.array().when('noExperience', {
    is: false,
    then: () => yup.array().of(
      yup.object().shape({
        company_name: yup.string().required('Nama perusahaan wajib diisi'),
        position: yup.string().required('Posisi wajib diisi'),
        start_date: yup.date().typeError('Tanggal mulai wajib diisi').required(),
        end_date: yup.date().typeError('Tanggal selesai wajib diisi').required(),
        description: yup.string().nullable()
      })
    ),
    otherwise: () => yup.array().nullable()
  }),

  skills: yup.string().nullable(),
  linkedin: yup.string().nullable(),
  instagram: yup.string().nullable(),
  facebook: yup.string().nullable(),
  x_twitter: yup.string().nullable(),
  about_me: yup.string().nullable()
});

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [serverError, setServerError] = useState('');

  // Dropdown States
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      province: 'Lampung',
      noExperience: false,
      education: [{ school_name: '', degree: '', major: '', start_year: '', end_year: '' }],
      work: []
    }
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' });
  const { fields: workFields, append: appendWork, remove: removeWork, replace: replaceWork } = useFieldArray({ control, name: 'work' });

  const watchProvince = watch('province');
  const watchCity = watch('city');
  const watchDistrict = watch('district');
  const watchNoExperience = watch('noExperience');

  // Fetch Existing Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        if (response.data.data && response.data.data.profile) {
          const p = response.data.data.profile;
          const user = response.data.data;

          // Process education
          let edu = [{ school_name: '', degree: '', major: '', start_year: '', end_year: '' }];
          if (user.education_histories && user.education_histories.length > 0) {
            edu = user.education_histories.map(e => ({
              school_name: e.school_name,
              degree: e.degree,
              major: e.major || '',
              start_year: e.start_year,
              end_year: e.end_year || ''
            }));
          }

          // Process work
          let work = [];
          let noExp = true;
          if (user.work_experiences && user.work_experiences.length > 0) {
            work = user.work_experiences.map(w => ({
              company_name: w.company_name,
              position: w.position,
              start_date: w.start_date,
              end_date: w.end_date || '',
              description: w.description || ''
            }));
            noExp = false;
          }

          if (p.photo) {
            setPhotoPreview(`http://127.0.0.1:8000/storage/${p.photo}`);
          }

          reset({
            full_name: p.full_name || '',
            ktp_number: p.ktp_number || '',
            phone: p.phone || '',
            alt_phone: p.alt_phone || '',
            birth_place: p.birth_place || '',
            birth_date: p.birth_date || '',
            gender: p.gender || '',
            religion: p.religion || '',
            marital_status: p.marital_status || '',
            last_education: p.last_education || '',
            about_me: p.about_me || '',
            address_ktp: p.address_ktp || '',
            province: p.province || 'Lampung',
            city: p.city || '',
            district: p.district || '',
            sub_district: p.sub_district || '',
            rt_rw: p.rt_rw || '',
            postal_code: p.postal_code || '',
            skills: p.skills || '',
            linkedin: p.linkedin || '',
            instagram: p.instagram || '',
            facebook: p.facebook || '',
            x_twitter: p.x_twitter || '',
            education: edu,
            noExperience: noExp,
            work: work,
          });
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, [reset]);

  // Handle Dropdowns Logic
  useEffect(() => {
    if (watchProvince === 'Lampung') {
      setCities(lampungData);
    } else {
      setCities([]);
    }
  }, [watchProvince]);

  useEffect(() => {
    if (watchCity) {
      const cityData = cities.find(c => c.city === watchCity);
      setDistricts(cityData ? cityData.districts : []);
    } else {
      setDistricts([]);
    }
  }, [watchCity, cities]);

  useEffect(() => {
    if (watchDistrict) {
      const distData = districts.find(d => d.district === watchDistrict);
      setSubDistricts(distData ? distData.sub_districts : []);
    } else {
      setSubDistricts([]);
    }
  }, [watchDistrict, districts]);

  useEffect(() => {
    if (watchNoExperience) {
      replaceWork([]);
    } else if (workFields.length === 0) {
      appendWork({ company_name: '', position: '', start_date: '', end_date: '', description: '' });
    }
  }, [watchNoExperience]);

  const handlePhotoSelect = (file) => {
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      const submitData = new FormData();
      
      // Append basic fields
      Object.keys(data).forEach(key => {
        if (key !== 'education' && key !== 'work' && key !== 'noExperience' && data[key] !== null && data[key] !== '') {
          // format date for laravel
          if (data[key] instanceof Date) {
            submitData.append(key, data[key].toISOString().split('T')[0]);
          } else {
            submitData.append(key, data[key]);
          }
        }
      });

      if (photoFile) submitData.append('photo', photoFile);

      // Format education and work to JSON strings with safe date conversion
      submitData.append('education', JSON.stringify(data.education));
      if (!data.noExperience && data.work.length > 0) {
        const formattedWork = data.work.map(w => ({
          ...w,
          start_date: w.start_date instanceof Date ? w.start_date.toISOString().split('T')[0] : w.start_date,
          end_date: w.end_date instanceof Date ? w.end_date.toISOString().split('T')[0] : w.end_date,
        }));
        submitData.append('work', JSON.stringify(formattedWork));
      }

      await api.post('/profile', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/jobs');
    } catch (err) {
      console.error(err);
      setServerError('Gagal menyimpan profil. Silakan periksa kembali isian Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar showAuth={true} userRole="applicant" />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-bmi-navy mb-3 tracking-tight">Lengkapi Profil Anda</h1>
          <p className="text-slate-500 text-lg">Hanya butuh beberapa menit untuk melengkapi data agar Anda dapat melamar pekerjaan.</p>
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 font-medium shadow-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <SectionCard title="Foto Profil" description="Unggah foto profesional yang jelas agar rekruter mudah mengenali Anda.">
            <UploadPhoto previewUrl={photoPreview} onFileSelect={handlePhotoSelect} />
          </SectionCard>

          <SectionCard title="Informasi Personal & Kontak" icon={User} description="Pastikan data pribadi sesuai dengan KTP Anda.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <InputField label="Nama Lengkap" {...register('full_name')} error={errors.full_name?.message} required />
              <InputField label="Nomor KTP (NIK)" maxLength={16} {...register('ktp_number')} error={errors.ktp_number?.message} required />
              <InputField label="Nomor WhatsApp/HP" {...register('phone')} error={errors.phone?.message} required />
              <InputField label="Nomor HP Alternatif" {...register('alt_phone')} error={errors.alt_phone?.message} optional />
              
              <InputField label="Tempat Lahir" {...register('birth_place')} error={errors.birth_place?.message} required />
              <InputField label="Tanggal Lahir" type="date" {...register('birth_date')} error={errors.birth_date?.message} required />
              
              <SelectField label="Jenis Kelamin" options={[
                { value: 'LAKI-LAKI', label: 'Laki-Laki' },
                { value: 'PEREMPUAN', label: 'Perempuan' }
              ]} {...register('gender')} error={errors.gender?.message} required />
              
              <SelectField label="Agama" options={[
                { value: 'Islam', label: 'Islam' }, { value: 'Kristen Protestan', label: 'Kristen Protestan' },
                { value: 'Katolik', label: 'Katolik' }, { value: 'Hindu', label: 'Hindu' },
                { value: 'Buddha', label: 'Buddha' }, { value: 'Konghucu', label: 'Konghucu' }
              ]} {...register('religion')} error={errors.religion?.message} required />
              
              <SelectField label="Status Pernikahan" options={[
                { value: 'Belum Kawin', label: 'Belum Kawin' }, { value: 'Kawin', label: 'Kawin' },
                { value: 'Cerai Hidup', label: 'Cerai Hidup' }, { value: 'Cerai Mati', label: 'Cerai Mati' }
              ]} {...register('marital_status')} error={errors.marital_status?.message} required />
              
              <SelectField label="Pendidikan Terakhir" options={[
                { value: 'SMA/SMK', label: 'SMA/SMK Sederajat' }, { value: 'D3', label: 'D3' },
                { value: 'D4/S1', label: 'D4 / S1' }, { value: 'S2', label: 'S2' }
              ]} {...register('last_education')} error={errors.last_education?.message} required />
            </div>
            
            <div className="mt-5">
              <TextAreaField label="Tentang Saya" rows={4} placeholder="Ceritakan singkat mengenai diri, minat, atau pengalaman yang membuat Anda menarik..." {...register('about_me')} error={errors.about_me?.message} optional />
            </div>
          </SectionCard>

          <SectionCard title="Alamat Tempat Tinggal" icon={MapPin} description="Informasi lokasi untuk mencocokkan dengan kriteria pekerjaan.">
            <TextAreaField label="Alamat Lengkap Sesuai KTP" {...register('address_ktp')} error={errors.address_ktp?.message} required />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-5">
              <SelectField label="Provinsi" options={[
                { value: 'Lampung', label: 'Lampung' }
              ]} {...register('province')} error={errors.province?.message} required />
              
              <SelectField label="Kota/Kabupaten" options={cities.map(c => ({ value: c.city, label: c.city }))} disabled={!watchProvince} {...register('city')} error={errors.city?.message} required />
              
              <SelectField label="Kecamatan" options={districts.map(d => ({ value: d.district, label: d.district }))} disabled={!watchCity} {...register('district')} error={errors.district?.message} required />
              
              <SelectField label="Kelurahan" options={subDistricts.map(s => ({ value: s, label: s }))} disabled={!watchDistrict} {...register('sub_district')} error={errors.sub_district?.message} required />
              
              <InputField label="RT/RW" placeholder="Contoh: 001/002" {...register('rt_rw')} error={errors.rt_rw?.message} optional />
              <InputField label="Kode Pos" {...register('postal_code')} error={errors.postal_code?.message} required />
            </div>
          </SectionCard>

          <SectionCard title="Riwayat Pendidikan" icon={GraduationCap} description="Tambahkan pendidikan Anda, mulai dari yang paling baru. Minimal 1 riwayat diperlukan.">
            {errors.education?.root?.message && (
              <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{errors.education.root.message}</p>
            )}
            
            {eduFields.map((field, index) => (
              <div key={field.id} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 mb-4 relative group transition hover:border-bmi-blue/30">
                {index > 0 && (
                  <button type="button" onClick={() => removeEdu(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 text-sm font-semibold">
                    Hapus
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Nama Institusi / Sekolah" {...register(`education.${index}.school_name`)} error={errors.education?.[index]?.school_name?.message} required />
                  <InputField label="Gelar / Tingkat" {...register(`education.${index}.degree`)} error={errors.education?.[index]?.degree?.message} required />
                  <InputField label="Jurusan" {...register(`education.${index}.major`)} error={errors.education?.[index]?.major?.message} required />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Tahun Masuk" placeholder="YYYY" {...register(`education.${index}.start_year`)} error={errors.education?.[index]?.start_year?.message} required />
                    <InputField label="Tahun Lulus" placeholder="YYYY" {...register(`education.${index}.end_year`)} error={errors.education?.[index]?.end_year?.message} required />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => appendEdu({ school_name: '', degree: '', major: '', start_year: '', end_year: '' })} className="text-sm font-bold text-bmi-blue hover:text-bmi-navy py-2 px-4 rounded-lg bg-bmi-blue/5 hover:bg-bmi-blue/10 transition">
              + Tambah Riwayat Pendidikan
            </button>
          </SectionCard>

          <SectionCard title="Pengalaman Kerja" icon={Briefcase} description="Ceritakan perjalanan karir profesional Anda.">
            <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" id="noExperience" {...register('noExperience')} className="w-5 h-5 rounded text-bmi-navy focus:ring-bmi-navy border-slate-300" />
              <label htmlFor="noExperience" className="font-semibold text-slate-700 cursor-pointer">Saya belum memiliki pengalaman kerja (Fresh Graduate)</label>
            </div>

            {!watchNoExperience ? (
              <>
                {workFields.map((field, index) => (
                  <div key={field.id} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 mb-4 relative transition hover:border-bmi-blue/30">
                    <button type="button" onClick={() => removeWork(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 text-sm font-semibold">
                      Hapus
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Nama Perusahaan" {...register(`work.${index}.company_name`)} error={errors.work?.[index]?.company_name?.message} required />
                      <InputField label="Posisi / Jabatan" {...register(`work.${index}.position`)} error={errors.work?.[index]?.position?.message} required />
                      <InputField label="Tanggal Mulai" type="date" {...register(`work.${index}.start_date`)} error={errors.work?.[index]?.start_date?.message} required />
                      <InputField label="Tanggal Selesai" type="date" {...register(`work.${index}.end_date`)} error={errors.work?.[index]?.end_date?.message} required />
                      <div className="md:col-span-2">
                        <TextAreaField label="Deskripsi Pekerjaan" rows={3} {...register(`work.${index}.description`)} error={errors.work?.[index]?.description?.message} optional />
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => appendWork({ company_name: '', position: '', start_date: '', end_date: '', description: '' })} className="text-sm font-bold text-bmi-blue hover:text-bmi-navy py-2 px-4 rounded-lg bg-bmi-blue/5 hover:bg-bmi-blue/10 transition">
                  + Tambah Pengalaman Kerja
                </button>
              </>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl">
                <p className="text-slate-500 font-medium">Anda mendaftar sebagai individu tanpa pengalaman kerja.</p>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Keahlian & Sosial Media" icon={LinkIcon}>
            <div className="mb-6">
              <TextAreaField label="Keahlian (Skills)" placeholder="Misal: Microsoft Excel, Leadership, Problem Solving..." helperText="Pisahkan dengan koma" {...register('skills')} error={errors.skills?.message} optional />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <InputField label="Profil LinkedIn" placeholder="https://linkedin.com/in/username" {...register('linkedin')} error={errors.linkedin?.message} optional />
              <InputField label="Instagram" placeholder="@username" {...register('instagram')} error={errors.instagram?.message} optional />
              <InputField label="Facebook" {...register('facebook')} error={errors.facebook?.message} optional />
              <InputField label="X / Twitter" placeholder="@username" {...register('x_twitter')} error={errors.x_twitter?.message} optional />
            </div>
          </SectionCard>

          <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 -mx-4 mt-8 shadow-[0_-10px_40px_rgb(0,0,0,0.05)] z-20">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <p className="text-sm text-slate-500 hidden sm:block">Periksa kembali data Anda sebelum menyimpan.</p>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-bmi-navy text-white px-10 py-3.5 rounded-xl font-bold text-lg hover:bg-bmi-blue transition-all disabled:opacity-50 shadow-lg"
              >
                {loading ? 'Menyimpan...' : <><Save size={20} /> Simpan Profil</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
