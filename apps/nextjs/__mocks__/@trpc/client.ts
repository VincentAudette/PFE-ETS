function loggerLink() {
  return () => null;
}
module.exports = {
  ...jest.requireActual("@trpc/client"),
  loggerLink,
};
