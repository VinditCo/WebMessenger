A simple web messaging app using NET Core and Javascript. 

Server
Requirements Net Core 2.0 (NuGet includes: SignalR)
1) from /WebMessenger/ run : "run.sh" in (a script to run 'dotnet run' in the /WebMessenger/WebMessenger directory) 
2) connect to "http://localhost:5000" with two browsers
3) Send messages via form at top of page

Tests 

Javascript Unit Tests
in : /WebMessenger/wwwroot/js/tests/

Requirements : 
Node.js, Mocha, Chai

To run all unit tests: /WebMessenger/wwwroot/js/tests/runTests.sh 

System Tests 

in : TestWebMessenger/Tests
(NuGet includes: XUnit, TestHost)

Can be run from any IDE with XUnit support (Suggest JetBrains Rider)

