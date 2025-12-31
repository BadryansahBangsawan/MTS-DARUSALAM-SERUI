const months = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export function getRoleLabel(role: string): string {
  const roleLabels: Record<string, string> = {
    admin: "Admin",
    staff: "Staff",
    supervisory: "Pengawas",
    leadership: "Pimpinan",
    staff_role: "Staf",
    teaching: "Guru",
    lab_manager: "Kepala Lab",
  };
  return roleLabels[role] || role;
}

export function getCategoryLabel(category: string): string {
  const categoryLabels: Record<string, string> = {
    religious: "Agama",
    language: "Bahasa",
    science: "Sains",
    social: "Sosial",
    skills: "Keterampilan",
    teaching: "Pengajaran",
    methodology: "Metodologi",
    student_care: "Perawatan Siswa",
  };
  return categoryLabels[category] || category;
}

export function getStatusBadgeProps(status?: string): { variant: "pending" | "approved" | "rejected" | "active" | "inactive"; label: string } {
  if (!status) {
    return { variant: "inactive", label: "Tidak Aktif" };
  }

  if (typeof status === "boolean") {
    return status
      ? { variant: "active", label: "Aktif" }
      : { variant: "inactive", label: "Tidak Aktif" };
  }

  if (status === "approved" || status === "featured") {
    return { variant: "approved", label: status === "approved" ? "Disetujui" : "Unggulan" };
  }

  if (status === "rejected") {
    return { variant: "rejected", label: "Ditolak" };
  }

  if (status === "pending") {
    return { variant: "pending", label: "Menunggu" };
  }

  if (status === "active") {
    return { variant: "active", label: "Aktif" };
  }

  if (status === "inactive") {
    return { variant: "inactive", label: "Tidak Aktif" };
  }

  return { variant: "inactive", label: status };
}

export function sortByKey<T>(array: T[], key: keyof T, direction: "asc" | "desc" = "asc"): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === bValue) return 0;
    if (aValue === null || aValue === undefined) return direction === "asc" ? 1 : -1;
    if (bValue === null || bValue === undefined) return direction === "asc" ? -1 : 1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc"
        ? aValue - bValue
        : bValue - aValue;
    }

    return 0;
  });
}

export function filterBySearch<T>(array: T[], search: string, keys: (keyof T)[]): T[] {
  if (!search.trim()) return array;

  const searchTerm = search.toLowerCase();

  return array.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      if (!value) return false;
      return String(value).toLowerCase().includes(searchTerm);
    })
  );
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}
