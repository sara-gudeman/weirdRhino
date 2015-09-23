Scraper Architecture
====================

###Summary
Batch scraping websites is juggling large amounts of flow which is
asynchronous at many turns along the way. In order to handle this best,
everything asynchronous is promisified where possible. Additionaly,
where conditional logic mandates differing paths, functions have 
been written to follow the varying paths, but guide everything back
to a common 'choke point' in order to nudge everything along the correct
flow.
