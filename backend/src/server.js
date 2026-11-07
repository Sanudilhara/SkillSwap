import 'dotenv/config';
import app from './app.js';

const port = process.env.PORT || 4000;

app.listen(port, '127.0.0.1', (error) => {
  if (error) {
    console.error(`Could not start SkillSwap API: ${error.message}`);
    process.exit(1);
  }

  console.log(`SkillSwap API is running at http://127.0.0.1:${port}`);
});
