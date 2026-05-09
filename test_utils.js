function it(message, fn) {
  try {
    fn();
    console.log(message, "- \x1b[32mPASSED\x1b[0m");
  } catch (e) {
    console.error(message, "- \x1b[31mFAILED\x1b[0m");
    console.error(e);
    throw e;
  }
}

function assert(condition) {
  if (!condition) {
    throw "\x1b[31mAssertion failed\x1b[0m";
  }
}

module.exports = {
  it,
  assert,
};
