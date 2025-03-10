const createError = (msg, status) => {
  const e = new Error(msg);
  e.status = status;
  return e;
};

module.exports = createError;
