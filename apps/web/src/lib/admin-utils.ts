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
