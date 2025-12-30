export interface Ekstrakurikuler {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  features: Array<{ icon: string; text: string }>;
  schedule: Array<{ day: string; time: string }>;
  rating: number;
  whatsapp: string;
}

export const ekstrakurikulerData: Ekstrakurikuler[] = [
  {
    id: "osim",
    name: "OSIM",
    subtitle: "Organisasi Intera Madrasah",
    icon: "BookOpen",
    color: "green",
    description:
      "Organisasi Siswa Intra Madrasah (OSIM) adalah organisasi resmi yang dibentuk di lingkungan madrasah sebagai wadah bagi siswa untuk belajar berorganisasi, mengembangkan kepemimpinan, dan menyalurkan aspirasi serta kreativitas dalam berbagai kegiatan kesiswaan. OSIM berperan sebagai perwakilan siswa dalam menjembatani komunikasi antara siswa, guru, dan pihak madrasah.",
    features: [
      { icon: "Brain", text: "Melatih kepemimpinan dan tanggung jawab siswa sejak dini." },
      { icon: "Trophy", text: "Meningkatkan keterampilan komunikasi dan public speaking." },
      { icon: "BookOpen", text: "Menanamkan nilai-nilai Islam dalam sikap dan perilaku." },
      { icon: "BookOpen", text: "Menanamkan nilai-nilai Islam dalam sikap dan perilaku." },
      { icon: "Users", text: "Menjadi wadah aspirasi dan kreativitas siswa." },
    ],
    schedule: [
      { day: "Senin - Jum'at", time: "07:00 - 17:00 WIT" },
    ],
    rating: 4.8,
    whatsapp: "6281382175517",
  },
  {
    id: "drumband",
    name: "Drumband",
    subtitle: "Marching Band & Musik",
    icon: "Drum",
    color: "red",
    description:
      "Drumband adalah kegiatan musik ensemble yang melatih kekompakan, disiplin, dan kepemimpinan melalui pertunjukan musik yang memukau. Siswa belajar berbagai alat musik tiup dan perkusi.",
    features: [
      { icon: "Drum", text: "Teknik bermain drum dan perkusi" },
      { icon: "Wind", text: "Alat musik tiup (trumpet, trombone)" },
      { icon: "Flag", text: "Choreography dan formasi marching" },
      { icon: "Award", text: "Persiapan lomba dan pertunjukan" },
    ],
    schedule: [
      { day: "Selasa", time: "15:30 - 17:30 WIT" },
    ],
    rating: 4.6,
    whatsapp: "6281382175517",
  },
  {
    id: "pramuka",
    name: "Pramuka",
    subtitle: "Gerakan Pramuka Indonesia",
    icon: "Hiking",
    color: "yellow",
    description:
      "Pramuka mengembangkan karakter kepemimpinan, kemandirian, dan cinta alam. Siswa belajar berbagai keterampilan hidup dan kepedulian sosial melalui kegiatan yang menyenangkan.",
    features: [
      { icon: "Compass", text: "Navigasi dan orienteering" },
      { icon: "Flame", text: "Survival dan kemah" },
      { icon: "HeartHandshake", text: "Kegiatan bakti sosial" },
      { icon: "Leaf", text: "Pendidikan lingkungan hidup" },
    ],
    schedule: [
      { day: "Jumat", time: "15:30 - 17:00 WIT" },
    ],
    rating: 4.9,
    whatsapp: "6285398844389",
  },
  {
    id: "tapak-suci",
    name: "Tapak Suci",
    subtitle: "Putera Muhammadiyah",
    icon: "FistRaised",
    color: "blue",
    description:
      "Tapak Suci adalah seni bela diri tradisional Indonesia yang mengembangkan fisik, mental, dan spiritual siswa. Menggabungkan teknik bertarung dengan nilai-nilai akhlak mulia.",
    features: [
      { icon: "Hand", text: "Teknik dasar bela diri" },
      { icon: "Activity", text: "Kondisi fisik dan flexibility" },
      { icon: "Heart", text: "Pembentukan karakter dan akhlak" },
      { icon: "ShieldAlert", text: "Self defense dan kepercayaan diri" },
    ],
    schedule: [
      { day: "Jum'at", time: "15:30 - 17:00 WIT" },
    ],
    rating: 4.7,
    whatsapp: "6281382175517",
  },
  {
    id: "hadrah",
    name: "Hadrah",
    subtitle: "Seni Musik Islam",
    icon: "Mosque",
    color: "purple",
    description:
      "Hadrah adalah seni musik tradisional Islam yang memadukan vokal, rebana, dan instrumen musik lainnya untuk menyampaikan pesan-pesan keagamaan dengan cara yang indah dan menyentuh hati.",
    features: [
      { icon: "Mic", text: "Teknik vokal dan harmonisasi" },
      { icon: "Drum", text: "Bermain rebana dan marawis" },
      { icon: "BookOpen", text: "Shalawat dan lagu-lagu Islami" },
      { icon: "Mic", text: "Performance dan panggung" },
    ],
    schedule: [
      { day: "Rabu & Jumat", time: "15:30 - 17:00 WIT" },
      { day: "Sabtu", time: "19:00 - 21:00 WIT" },
    ],
    rating: 4.8,
    whatsapp: "6281382175517",
  },
];