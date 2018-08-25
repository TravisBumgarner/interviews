Note that this uses Xerial's SQLite JDBC driver (https://bitbucket.org/xerial/sqlite-jdbc).

Compile:
  Windows:
    javac -classpath ".;lib\javax.json-1.0.4.jar" MemtrackingBackend.java
  Mac / Linux:
    javac -classpath ".:lib/javax.json-1.0.4.jar" MemtrackingBackend.java

Run:
  Windows:
    java -classpath ".;lib\sqlite-jdbc-3.21.0.jar;lib\javax.json-1.0.4.jar" MemtrackingBackend
  Mac / Linux:
    java -classpath ".:lib/sqlite-jdbc-3.21.0.jar:lib/javax.json-1.0.4.jar" MemtrackingBackend
