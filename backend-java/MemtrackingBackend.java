import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonWriter;

public class MemtrackingBackend {

  private static final int MILLISECONDS_IN_SECOND = 1000;

  // Taken from http://www.rgagnon.com/javadetails/java-get-url-parameters-using-jdk-http-server.html
  public static Map<String, String> queryToMap(String query) {
    Map<String, String> result = new HashMap<String, String>();

    if (query == null) {
      return result;
    }

    for (String param : query.split("&")) {
      String pair[] = param.split("=");
      if (pair.length > 1) {
        result.put(pair[0], pair[1]);
      } else{
        result.put(pair[0], "");
      }
    }
    return result;
  }

  // Returns -1 if millisecondsString is null or unparseable
  public static long parseMillisecondStringIntoSeconds(String millisecondsString) {
    if (millisecondsString == null) {
      return -1;
    }

    long parsedLong;

    try {
      parsedLong = Long.parseLong(millisecondsString);
    } catch (Exception e) {
      System.err.println(e);
      return -1;
    }


    return parsedLong / MILLISECONDS_IN_SECOND;
  }

  public static float averageList(ArrayList<Integer> list) {
    if (list.size() == 0) {
      return 0;
    }

    float sum = 0;
    for (int n : list) sum += n;

    return sum / list.size();
  }

  /*
  GET /data

  Url params:
    startTime: milliseconds since the epoch. Optional.
    endTime: milliseconds since the epoch. Optional.
    pages: comma-separated list of pages. Optional.

  Returns as JSON:
  {
    "stats": {
      "totalReadings": <Number, total number of filtered data points>,
      "totalCrashes": <Number, number of crashes in the filtered set>,
      "averageMemory": <Number, average memory used in the filtered set>,
      "averageMemoryAtCrash": <Number, average memory used in the filtered set at crash>
    },
    "points": [{
      "time": <Number, milliseconds since epoch>,
      "memory": <Number, bytes>,
      "didCrash": <Boolean>,
      "page": <String>
    }]
  }
  */
  static class DataHandler implements HttpHandler {
    public DataHandler(Connection db) {
      this.db = db;
    }

    public void handle(HttpExchange ex) {
      // Parse the parameters
      Map<String, String> queryParams = queryToMap(ex.getRequestURI().getQuery());

      // Params take milliseconds and db is in seconds, so we convert
      long startTime = parseMillisecondStringIntoSeconds(queryParams.get("startTime"));
      long endTime = parseMillisecondStringIntoSeconds(queryParams.get("endTime"));

      String pagesStr = queryParams.get("pages");
      Set<String> pages = null;
      if (pagesStr != null) {
        pages = new HashSet<String>(Arrays.asList(pagesStr.split(",")));
      }

      // Execute the query
      Statement stmt = null;
      ResultSet rows = null;

      // Iterate over the result set, pulling out the data and statistics we need
      ArrayList<Integer> memoryAllPoints = new ArrayList<Integer>();
      ArrayList<Integer> memoryCrashedPoints = new ArrayList<Integer>();
      JsonArrayBuilder data = Json.createArrayBuilder();

      try {
        stmt = db.createStatement();
        rows = stmt.executeQuery("SELECT * FROM reports");

        while (rows.next()) {
          long timestamp = rows.getInt("timestamp");
          int bytesUsed = rows.getInt("bytes_used");
          boolean didCrash = rows.getInt("did_aww_snap") == 1;
          String currentPage = rows.getString("current_page");

          if (((startTime == -1) || (timestamp >= startTime)) &&
              ((endTime == -1) || (timestamp <= endTime)) &&
              ((pages == null) || pages.contains(currentPage))) {
            memoryAllPoints.add(bytesUsed);

            if (didCrash) {
              memoryCrashedPoints.add(bytesUsed);
            }

            data.add(Json.createObjectBuilder()
              .add("time", timestamp * MILLISECONDS_IN_SECOND)
              .add("memory", bytesUsed)
              .add("didCrash", didCrash)
              .add("page", currentPage)
            );
          }
        }
      } catch (SQLException e) {
        System.err.println(e);
        return;
      }

      // Build our response
      JsonObject response = Json.createObjectBuilder()
        .add("stats", Json.createObjectBuilder()
          .add("totalReadings", memoryAllPoints.size())
          .add("totalCrashes", memoryCrashedPoints.size())
          .add("averageMemory", averageList(memoryAllPoints))
          .add("averageMemoryAtCrash", averageList(memoryCrashedPoints))
        )
        .add("points", data)
        .build();

      byte[] responseBytes = response.toString().getBytes();

      // Send the headers
      try {
        Headers headers = ex.getResponseHeaders();
        headers.set("Content-Type", "application/json");
        // Needed to keep CORS happy
        headers.set("Access-Control-Allow-Methods", "GET");
        headers.set("Access-Control-Allow-Origin", "*");
        ex.sendResponseHeaders(200, responseBytes.length);

        // Send the body
        OutputStream os = ex.getResponseBody();
        os.write(responseBytes);
        os.close();
      } catch (IOException e) {
        System.err.println(e);
        return;
      }
    }

    private Connection db;
  }

  public static void main(String[] args) {
    // Try to set up a connection to the SQLite database
    Connection db = null;
    try {
      Class.forName("org.sqlite.JDBC");
      db = DriverManager.getConnection("jdbc:sqlite:../reports.db");
    } catch (Exception e) {
      System.err.println(e);
      return;
    }

    // Start up an HTTP listening on port 3265, and add the handler at /data
    HttpServer server;
    try {
      server = HttpServer.create(new InetSocketAddress(3265), 0);
    } catch (Exception e) {
      System.err.println(e);
      return;
    }

    server.createContext("/data", new DataHandler(db));
    server.setExecutor(null);
    server.start();
  }
}
