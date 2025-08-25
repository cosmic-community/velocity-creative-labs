const fs = require('fs');
const path = require('path');

function injectConsoleCapture() {
  const outputDir = path.join(process.cwd(), '.next', 'server', 'pages');
  const staticDir = path.join(process.cwd(), '.next', 'static');
  
  // Console capture script content
  const consoleScript = `<script>(function() {
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  function serializeArgs(args) {
    return Array.from(args).map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, (key, value) => {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
  }
  
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = serializeArgs(args);
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {}
  }
  
  ['log', 'warn', 'error', 'info', 'debug'].forEach(method => {
    console[method] = function() {
      originalConsole[method].apply(console, arguments);
      captureLog(method, arguments);
    };
  });
  
  window.addEventListener('error', function(event) {
    captureLog('error', [\`Uncaught Error: \${event.message}\`, \`at \${event.filename}:\${event.lineno}:\${event.colno}\`]);
  });
  
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', [\`Unhandled Promise Rejection: \${event.reason}\`]);
  });
  
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
      sendRouteChange();
    } catch (e) {}
  }
  
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(sendRouteChange, 0);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(sendRouteChange, 0);
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sendReady);
  } else {
    sendReady();
  }
  
  window.addEventListener('load', sendReady);
})();</script>`;

  // Function to inject script into HTML files
  function injectIntoHtmlFiles(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        injectIntoHtmlFiles(fullPath);
      } else if (file.name.endsWith('.html')) {
        try {
          let content = fs.readFileSync(fullPath, 'utf8');
          
          // Only inject if not already present
          if (!content.includes('console-capture-ready')) {
            // Try to inject after <head> tag, fallback to before </head>
            if (content.includes('<head>')) {
              content = content.replace('<head>', '<head>' + consoleScript);
            } else if (content.includes('</head>')) {
              content = content.replace('</head>', consoleScript + '</head>');
            } else if (content.includes('<html>')) {
              content = content.replace('<html>', '<html>' + consoleScript);
            }
            
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Injected console capture into: ${fullPath}`);
          }
        } catch (error) {
          console.warn(`Failed to process ${fullPath}:`, error.message);
        }
      }
    }
  }
  
  // Inject into built files
  console.log('Injecting console capture script into built files...');
  
  // Check common Next.js output directories
  const possibleDirs = [
    path.join(process.cwd(), 'out'),
    path.join(process.cwd(), '.next', 'server', 'pages'),
    path.join(process.cwd(), '.next', 'static'),
    path.join(process.cwd(), 'dist'),
    path.join(process.cwd(), 'build')
  ];
  
  for (const dir of possibleDirs) {
    injectIntoHtmlFiles(dir);
  }
  
  console.log('Console capture injection complete.');
}

// Run the injection
injectConsoleCapture();