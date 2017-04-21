function unfilledPrompts(allPrompts, options) {
  return allPrompts.filter(function (prompt) {
    if (options[prompt.name]) {
      return false;
    }
    return true;
  });
}

module.exports = {
  unfilledPrompts
};
