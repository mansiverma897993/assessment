const API_BASE = process.env.REACT_APP_API_URL || "";

export async function submitPipeline(nodes, edges) {
  try {
    const response = await fetch(`${API_BASE}/pipelines/parse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!response.ok) {
      const text = await response.text();
      let errMsg = `Backend error (${response.status})`;
      try {
        const json = JSON.parse(text);
        if (json.detail) errMsg += ": " + (Array.isArray(json.detail) ? json.detail.map((d) => d.msg || d).join(", ") : json.detail);
      } catch {
        if (text) errMsg += ": " + text.slice(0, 100);
      }
      window.alert(errMsg);
      return;
    }

    const data = await response.json();
    const message = `
Pipeline Analysis

Nodes: ${data.num_nodes}
Edges: ${data.num_edges}

Valid DAG: ${data.is_dag ? "Yes" : "No"}
`;
    window.alert(message);
  } catch (error) {
    console.error("Pipeline submission failed:", error);
    const hint = API_BASE ? " at " + API_BASE : " (run backend: uvicorn main:app --reload from backend folder)";
  window.alert("Error connecting to backend." + hint);
  }
}