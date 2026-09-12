function formatCurrentDate() {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date()).replace(/^./, (letter) => letter.toUpperCase())
}

export function CurrentDate() {
  const date = formatCurrentDate()

  return <span className="edition-date" aria-label={`Data de hoje: ${date}`} suppressHydrationWarning>{date}</span>
}
