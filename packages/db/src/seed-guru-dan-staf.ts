import { db } from './index';
import { guruDanStaf } from './schema';

const initialData = [
  // 1. PIMPINAN MADRASAH
  {
    nama: "Drs. H. Muchtar",
    kategori: "pimpinan" as const,
    jabatan: "Kepala Madrasah",
    sortOrder: 0,
    colorTheme: "green",
    backgroundStyle: "bg-gradient-to-r from-green-600 to-green-400 text-white",
    isActive: true,
  },

  // 2. WAKIL KEPALA MADRASAH
  {
    nama: "Irwan, S.Pd",
    kategori: "wakamad" as const,
    jabatan: "Waka Bidang Kurikulum",
    sortOrder: 0,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Fatmawati Rumayomi, S.Hum",
    kategori: "wakamad" as const,
    jabatan: "Waka Bidang Kesiswaan",
    sortOrder: 1,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Risnawati, S.Pd",
    kategori: "wakamad" as const,
    jabatan: "Waka Bidang Sarana dan Prasarana",
    sortOrder: 2,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Ardi Amsir Amran, S.Pd",
    kategori: "wakamad" as const,
    jabatan: "Waka Bidang Humas",
    sortOrder: 3,
    colorTheme: "green",
    isActive: true,
  },

  // 3. UNIT PENUNJANG / STRUKTURAL
  {
    nama: "Dinda Salsabila R. Hetaria, SE",
    kategori: "unit_penunjang" as const,
    jabatan: "Kepala Tata Usaha",
    sortOrder: 0,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Ratna Indrasari, S.Pd",
    kategori: "unit_penunjang" as const,
    jabatan: "Kepala Perpustakaan",
    sortOrder: 1,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Husniah Zulfa Satiroh, S.Pd",
    kategori: "unit_penunjang" as const,
    jabatan: "Kepala Pengelola Laboratorium (IPA, Komputer, Bahasa)",
    sortOrder: 2,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Marsyanti, S.Hum",
    kategori: "unit_penunjang" as const,
    jabatan: "Bendahara BOS",
    sortOrder: 3,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Ratna Indrasari, S.Pd",
    kategori: "unit_penunjang" as const,
    jabatan: "Bendahara Komite",
    sortOrder: 4,
    colorTheme: "green",
    isActive: true,
  },

  // 4. PEMBINA EKSTRAKURIKULER
  {
    nama: "Ardi Amsir Amran, S.Pd",
    kategori: "pembina_ekstra" as const,
    jabatan: "Pembina OSIM",
    sortOrder: 0,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Marsyanti, S.Hum",
    kategori: "pembina_ekstra" as const,
    jabatan: "Pembina Pramuka",
    sortOrder: 1,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Ardi Amsir Amran, S.Pd",
    kategori: "pembina_ekstra" as const,
    jabatan: "Pembina Drumband",
    sortOrder: 2,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Irwan, S.Pd",
    kategori: "pembina_ekstra" as const,
    jabatan: "Pembina Pencak Silat",
    sortOrder: 3,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Reni Iriani, S.Pd.I",
    kategori: "pembina_ekstra" as const,
    jabatan: "Pembina Hadroh",
    sortOrder: 4,
    colorTheme: "green",
    isActive: true,
  },

  // 5. WALI KELAS
  {
    nama: "Fatmawati Rumayomi, S.Hum",
    kategori: "wali_kelas" as const,
    jabatan: "Wali Kelas VII A",
    kelas: ["VII A"],
    sortOrder: 0,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Reni Iriani, S.Pd.I",
    kategori: "wali_kelas" as const,
    jabatan: "Wali Kelas VII B",
    kelas: ["VII B"],
    sortOrder: 1,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Marsyanti, S.Hum",
    kategori: "wali_kelas" as const,
    jabatan: "Wali Kelas VIII A",
    kelas: ["VIII A"],
    sortOrder: 2,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Irwan, S.Pd",
    kategori: "wali_kelas" as const,
    jabatan: "Wali Kelas VIII B",
    kelas: ["VIII B"],
    sortOrder: 3,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Ardi Amsir Amran, S.Pd",
    kategori: "wali_kelas" as const,
    jabatan: "Wali Kelas IX A",
    kelas: ["IX A"],
    sortOrder: 4,
    colorTheme: "green",
    isActive: true,
  },
  {
    nama: "Ratna Indrasari, S.Pd",
    kategori: "wali_kelas" as const,
    jabatan: "Wali Kelas IX B",
    kelas: ["IX B"],
    sortOrder: 5,
    colorTheme: "green",
    isActive: true,
  },

  // 6. TENAGA KEPENDIDIKAN
  {
    nama: "Saldi Ramli, A.Ma",
    kategori: "tenaga_kependidikan" as const,
    jabatan: "Staf Tata Usaha",
    sortOrder: 0,
    colorTheme: "green",
    isActive: true,
  },
];

export async function seedGuruDanStaf() {
  console.log('Seeding guru & staf data...');

  try {
    // Check if data already exists
    const existing = await db.select().from(guruDanStaf);
    if (existing.length > 0) {
      console.log('Guru & staf data already exists, skipping seed.');
      return;
    }

    // Insert initial data
    await db.insert(guruDanStaf).values(initialData);
    console.log('Guru & staf data seeded successfully!');
  } catch (error) {
    console.error('Error seeding guru & staf data:', error);
  }
}
