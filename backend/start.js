const { syncDb } = require('./models/index.js');
const app = require('./index.js');

const PORT = process.env.PORT || 4000;

syncDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });
