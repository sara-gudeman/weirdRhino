/**
 * Break all of the urls into batches of BATCH_SIZE.
 * This reduces the concurrent workload on node,
 * and helps keep variables stable.
 *
 * @param Array productModels
 * @return Array of arrays
 */
var BATCH_SIZE = 1;
module.exports = function(productModels) {
  var results = [];
  var batch = [];

  for(var i = 0; i < productModels.length; i++) {
    if((i !== 0 && i % BATCH_SIZE === 0) || i === productModels.length) {
      results.push([productModels[i]]);
      batch = [];
      batch.push(productModels[i]);
    } else {
      batch.push(productModels[i]);
    }
  }

  return results;
}
