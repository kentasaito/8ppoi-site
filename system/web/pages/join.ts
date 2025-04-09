import { Context } from "@hono/hono";

export const content = (_c: Context) => {
  return `
    <h1>メンバー登録</h1>
    <div>
      <form>
        <div>
          <label>メンバーID:</label><br>
          <input type="text" name="memberId" required><br>
        </div>
        <div>
          <label>メールアドレス:</label><br>
          <input type="email" name="email" required><br>
        </div>
        <div>
          <label>公開鍵:</label><br>
          <textarea cols="32" rows="12" name="publicKey" required></textarea><br>
        </div>
        <div>
          <p>
            メンバー登録することで<a href="/terms">利用規約</a>と<a href="/privacy">プライバシーポリシー</a>に同意したことになります。<br>
          </p>
        </div>
        <div>
          <button type="submit">メンバー登録</button>
        </div>
      </form>
    </div>
    <script type="module">
      document.querySelector("form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const response = await fetch("/api/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          alert("Successfully joined!");
          window.location.href = "/";
        } else {
          alert("Failed to join. Please try again.");
        }
      });
    </script>
  `;
};
