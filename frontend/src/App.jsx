import { useEffect, useState } from "react";
import { fetchMessages, createMessage } from "./api";

function App() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [loading, setLoading] = useState(false);

  const loadMessages = async () => {
    try {
      const data = await fetchMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
      alert("Error loading messages");
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    setLoading(true);
    try {
      await createMessage(form);
      setForm({ name: "", message: "" });
      await loadMessages();
    } catch (err) {
      console.error(err);
      alert("Error submitting message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Khilesh Wall 🧱</h1>
        <p style={styles.subtitle}>Leave a message for future you.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            style={{ ...styles.input, height: 80, resize: "vertical" }}
            placeholder="Your message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button style={styles.button} disabled={loading}>
            {loading ? "Saving..." : "Post message"}
          </button>
        </form>

        <div style={styles.list}>
          {messages.map((m) => (
            <div key={m._id} style={styles.item}>
              <div style={styles.itemTop}>
                <strong>{m.name}</strong>
                <span style={styles.date}>
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </div>
              <p style={styles.msg}>{m.message}</p>
            </div>
          ))}

          {messages.length === 0 && (
            <p style={styles.empty}>No messages yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0D0D0F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem"
  },
  card: {
    maxWidth: 700,
    width: "100%",
    background: "#1E1E23",
    borderRadius: 16,
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    color: "#fff",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
  },
  title: { margin: 0, fontSize: 28 },
  subtitle: { marginTop: 8, color: "#BDBDBD" },
  form: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: 8,
    border: "1px solid #333",
    background: "#131316",
    color: "#fff",
    outline: "none"
  },
  button: {
    marginTop: 4,
    padding: "0.75rem 1rem",
    borderRadius: 999,
    border: "none",
    background: "#FF691E",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer"
  },
  list: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxHeight: 300,
    overflowY: "auto"
  },
  item: {
    padding: "0.75rem 1rem",
    borderRadius: 10,
    background: "#111118"
  },
  itemTop: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    marginBottom: 4
  },
  date: { color: "#888" },
  msg: { margin: 0 },
  empty: { color: "#888", textAlign: "center", marginTop: 8 }
};

export default App;
