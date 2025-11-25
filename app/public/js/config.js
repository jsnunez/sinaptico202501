// Detect operating system and set appropriate API URL
const isWindows = navigator.platform.toLowerCase().includes('win');
const API_BASE_URL = isWindows 
    ? "http://localhost:4000"  // Windows
    : "https://sinaptic11.cpcoriente.org";  // Linux
