

import com.firebase.client.Firebase;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.json.simple.parser.JSONParser;

import javax.json.Json;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by Naga on 16-01-2017.
 */
@WebServlet(name = "voice", urlPatterns = "/voice")
public class fbwrapper extends HttpServlet {

    protected String getLanguageCode(String language){

        language = language.toLowerCase();

        if(language.equals("arabic"))
            return "ar";
        if(language.equals("french"))
            return "fr";
        if(language.equals("spanish"))
            return "es";
        if(language.equals("german"))
            return "de";
        if(language.equals("urdu"))
            return "ur";

        return null;
    };

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        resp.setHeader("Access-Control-Max-Age", "3600");
        resp.setHeader("Access-Control-Allow-Headers", "x-requested-with, X-Auth-Token, Content-Type");
        resp.setContentType("application/json");
        String topic = req.getParameter("topic");
        String msg = req.getParameter("msg");
        System.out.print(topic + " " + msg);
        resp.getWriter().write("Voice service working");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        fbdb.connect();

        StringBuilder buffer = new StringBuilder();
        BufferedReader reader = req.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        String data = buffer.toString();
        System.out.println(data);
        String output = "";
        JSONObject params = new JSONObject(data);
        JSONObject result = params.getJSONObject("result");
        JSONObject parameters = result.getJSONObject("parameters");
        if (parameters.has("commandtext")) {

            JSONObject js = new JSONObject();

            if(parameters.getString("commandtext").equals("swap")){
                String field1 = parameters.getString("field1");
                String field2 = parameters.getString("field2");

                fbdb.swapFields(field1,field2);

                js.put("speech", "Fields have been swapped");
                js.put("displayText", "Fields have been swapped" );
                js.put("source", "Fields have been swapped");
                output = js.toString();
            }

            if(parameters.getString("commandtext").equals("clear")){
                String field1 = parameters.getString("field1");
                fbdb.clearFieldPlayer(field1);

                js.put("speech", "Fields have been cleared");
                js.put("displayText", "Fields have been cleared" );
                js.put("source", "Fields have been cleared");
                output = js.toString();
            }

            if(parameters.getString("commandtext").equals("chat")){
                String field1 = parameters.getString("chattext");
                fbdb.sendMessage(field1);

                js.put("speech", "Message Sent");
                js.put("displayText", "Message Sent" );
                js.put("source", "Message Sent");
                output = js.toString();
            }

            if(parameters.getString("commandtext").equals("open")){
                String field1 = parameters.getString("interface");
                fbdb.fbdbObj.child("command").setValue(field1);
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                js.put("speech", "Interface Opened");
                js.put("displayText", "Interface Opened" );
                js.put("source", "Interface Opened");
                output = js.toString();
            }

        }

        resp.setHeader("Content-type", "application/json;charset=UTF-8");
        resp.getWriter().write(output);
    }
}