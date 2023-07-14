import formatTodoForAI from "./formatTodoForAI";

const fetchSuggestion = async (board: Playground) => {
  try {
    const todos = formatTodoForAI(board);

    const res = await fetch("/api/generateSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todos }),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const GPTData = await res.json();
      const { content } = GPTData;
      return content;
    } else {
      throw new Error("Invalid content type returned");
    }
  } catch (error) {
    console.error("Error fetching suggestion:", error);
    throw error;
  }
};
export default fetchSuggestion
