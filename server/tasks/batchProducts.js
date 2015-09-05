/**
 * Break all of the urls into batches of ten.
 * This reduces the concurrent workload on node,
 * and helps keep variables stable.
 *
 * @param Array productModels
 * @return Array of arrays
 */
module.exports = function(productModels) {
  var results = [];
  var batch = [];

  for(var i = 0; i < productModels.length; i++) {
    if((i !== 0 && i % 10 === 0) || i === productModels.length) {
      results.push(batch);
      batch = [];
      batch.push(productModels[i]);
    } else {
      batch.push(productModels[i]);
    }
  }

  return results;
}
