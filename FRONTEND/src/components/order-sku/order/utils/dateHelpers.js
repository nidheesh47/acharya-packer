export const formatDate = (d) => {
  if (!d) return "-";
  if (typeof d === "string")
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  if (d.$date)
    return new Date(d.$date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatShortDate = (d) => {
  if (!d) return "-";
  const date = typeof d === "string" ? new Date(d) : d.$date ? new Date(d.$date) : new Date(d);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatFullDateTime = (d) => {
  if (!d) return "-";
  const date = typeof d === "string" ? new Date(d) : d?.$date ? new Date(d.$date) : new Date(d);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatTimeAgo = (date) => {
  if (!date) return "";
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatShortDate(date);
};