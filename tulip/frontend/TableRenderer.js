function humanReadableMemorySize(rawMemoryValue){
  var humanReadableForm = parseInt(parseInt(rawMemoryValue, 10) / 1024, 10);
  humanReadableForm += "MB";
  return humanReadableForm;
}

window.MemtrackingTableRenderer = (function() {
  function renderStat(spanId, value) {
    document.getElementById(spanId).innerText = value;
  }

  function renderTable(stats) {
    renderStat('statTotalReadings', stats.totalReadings);
    renderStat('statNumCrashes', stats.totalCrashes);
    renderStat('statAvgMem', humanReadableMemorySize(stats.averageMemory));
    renderStat('statAvgCrashMem', humanReadableMemorySize(stats.averageMemoryAtCrash));
  }

  return {
    renderTable: renderTable,
  }
})();
