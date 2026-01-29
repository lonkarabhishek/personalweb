export const generateICS = () => {
  const event = {
    title: "Intro Call: Abhishek Lonkar",
    description: "Discussing your project requirements and how we can work together.",
    location: "Google Meet",
    duration: 30, // minutes
  };

  // Create a time for "tomorrow at 10 AM" as a placeholder default, 
  // users usually import this into their calendar app which lets them pick the slot, 
  // or this serves as a template.
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() + 1);
  startDate.setHours(10, 0, 0, 0);
  
  const endDate = new Date(startDate);
  endDate.setMinutes(startDate.getMinutes() + event.duration);

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Abhishek Lonkar//Portfolio//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@abhishek.com`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "abhishek-intro.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};