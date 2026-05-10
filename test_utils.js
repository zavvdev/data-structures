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

function assert_throw(fn) {
  var thrown = false;
  try {
    fn();
  } catch {
    thrown = true;
  }
  if (!thrown) {
    throw new Error("Expected fn to throw an error");
  }
}

module.exports = {
  it,
  assert,
  assert_throw,
};
