import { db } from './src';
import { testimonials } from './src/schema';

async function seedTestimonials() {
  try {
    const sampleTestimonials = [
      {
        authorName: "Budi Santoso",
        role: "Mahasiswa, Universitas Indonesia",
        content: "MTs Darussalam membantu saya berkembang secara akademik dan spiritual. Guru-gurunya sangat mendukung dan fasilitasnya lengkap. Sangat berterima kasih atas semua bimbingannya!",
        rating: 5,
        imageUrl: "/uploads/testimonial-1.jpg",
        isApproved: true,
        isFeatured: true,
      },
      {
        authorName: "Siti Aminah",
        role: "Guru SDN 1 Jakarta",
        content: "Pendidikan di MTs Darussalam sangat berkualitas. Saya belajar banyak tentang nilai-nilai Islam dan pengetahuan umum yang bermanfaat untuk karier saya sebagai guru.",
        rating: 5,
        imageUrl: "/uploads/testimonial-2.jpg",
        isApproved: true,
        isFeatured: true,
      },
      {
        authorName: "Ahmad Fauzi",
        role: "Wiraswasta",
        content: "MTs Darussalam tidak hanya mengajarkan pelajaran akademik, tapi juga membentuk karakter dan kedisiplinan yang sangat berguna dalam kehidupan sehari-hari.",
        rating: 4,
        imageUrl: "/uploads/testimonial-3.jpg",
        isApproved: true,
        isFeatured: false,
      },
      {
        authorName: "Dewi Lestari",
        role: "Mahasiswi, Universitas Airlangga",
        content: "Lingkungan belajar yang nyaman dan guru-guru yang ramah membuat masa SMP saya sangat menyenangkan di MTs Darussalam.",
        rating: 5,
        imageUrl: "/uploads/testimonial-4.jpg",
        isApproved: true,
        isFeatured: false,
      },
      {
        authorName: "Rizky Pratama",
        role: "Karyawan PT Telkom Indonesia",
        content: "Kedisiplinan yang diajarkan di MTs Darussalam sangat membantu saya dalam dunia kerja. Terima kasih kepada semua guru dan staf!",
        rating: 5,
        imageUrl: "/uploads/testimonial-5.jpg",
        isApproved: true,
        isFeatured: false,
      },
    ];

    await db.insert(testimonials).values(sampleTestimonials);

    console.log("✅ Testimonials seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding testimonials:", error);
    process.exit(1);
  }
}

seedTestimonials();
