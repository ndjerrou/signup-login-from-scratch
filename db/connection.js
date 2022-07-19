const { connect } = require('mongoose');

module.exports = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log('Successfully connected to DB');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
