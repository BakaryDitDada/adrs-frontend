export const formatTimestamp = (iso) => {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (diffMinutes < 1) {
    return "À l’instant";
  } else if (diffMinutes < 60) {
    return `Il y a ${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
  } else if (diffHours < 24 && isSameDay(date, now)) {
    return `Il y a ${diffHours} heure${diffHours !== 1 ? "s" : ""}`;
  } else if (isSameDay(date, yesterday)) {
    return `Hier à ${date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit"
    })}`;
  } else {
    return date.toLocaleString("fr-FR", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
};
