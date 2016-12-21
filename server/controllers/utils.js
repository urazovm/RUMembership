exports.requiredVariable = function (variable, varName, missing) {
  if (typeof variable == 'undefined') {
    missing.push(varName);
  }
  return missing;
}