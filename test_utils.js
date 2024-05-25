function it(message, fn) {
  try {
    fn();
    console.log(message, "- PASSED");
  } catch (e) {
    console.error(message, "- FAILED");
    console.error(e);
    throw e;
  }
}

function assert(condition) {
  if (!condition) {
    throw "Assertion failed";
  }
}

module.exports = {
  it,
  assert,
};
