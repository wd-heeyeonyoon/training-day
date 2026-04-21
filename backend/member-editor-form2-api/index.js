// index.js
import app from "./src/app.js";

const port = 3003;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}...`);
});
