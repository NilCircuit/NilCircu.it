(async () => {
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install('snowballstemmer');
    await pyodide.loadPackage("beautifulsoup4");
    // Initialize Pyodide
    languagePluginLoader.then(() => {
    pyodide.runPythonAsync(`
      import snowballstemmer
      from bs4 import *
      stemmer = snowballstemmer.stemmer('english')
      print(stemmer.stemWords('go goes going gone'.split()))
    `).then(console.log).catch(console.error);
  });
})();
  