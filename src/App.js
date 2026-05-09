import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your Job Search Agent. Tell me about yourself and what kind of job you're looking for!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>🤖 Job Search Agent</h1>

      <div style={{ height: "500px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "10px", padding: "20px", marginBottom: "20px", backgroundColor: "#f9f9f9" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "15px", textAlign: msg.role === "user" ? "right" : "left" }}>
            <span style={{
              display: "inline-block",
              padding: "10px 15px",
              borderRadius: "18px",
              backgroundColor: msg.role === "user" ? "#3498db" : "#ffffff",
              color: msg.role === "user" ? "white" : "#2c3e50",
              maxWidth: "80%",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              whiteSpace: "pre-wrap",
              textAlign: "left"
            }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <div style={{ textAlign: "left", color: "#888" }}>Agent is thinking...</div>}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask about jobs, resumes, interviews..."
          style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px" }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "12px 24px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;