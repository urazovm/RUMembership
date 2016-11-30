exports.requiredVariable = function(variable, varName, missing) {
  if (!variable) {
    missing.push(varName);
  }
  return missing;
}