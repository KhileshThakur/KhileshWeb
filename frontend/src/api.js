const API_BASE = import.meta.env.VITE_API_BASE || window.location.origin; 

export async function fetchMessages() {
  const res = await fetch(`${API_BASE}/api/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function createMessage(data) {
  const res = await fetch(`${API_BASE}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create message");
  return res.json();
}
