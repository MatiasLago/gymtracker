Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\matias\Documents\gymapp"
WshShell.Run "node server.js", 0, False
