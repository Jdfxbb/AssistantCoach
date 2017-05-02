

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
@WebServlet(name = "translate", urlPatterns = "/translate")
public class translate extends HttpServlet {

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
        resp.getWriter().write("URL Working");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
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
        if (parameters.has("lang-to")) {
            String word = parameters.getString("text").toString();
            String targetlang = getLanguageCode(parameters.getString("lang-to"));
            word = word.replace(' ','+');
            String query = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170429T001106Z.6db129003c8cd87a.91e1d2df69f81eba88bc07b1b41a006ef04d3e09&text=" + word + "&lang=en-" + targetlang;

            JSONObject jsonObject = getData(query);
            JSONObject js = new JSONObject();

            JSONArray convertedTextArray = jsonObject.getJSONArray("text");
            final String convertedText = convertedTextArray.get(0).toString();

            System.out.println(convertedText);
            js.put("speech", "Translation is " + convertedText );
            js.put("displayText", "Translation is " + convertedText );
            js.put("source", "Translation");
            output = js.toString();
        }

        resp.setHeader("Content-type", "application/json;charset=UTF-8");
        resp.getWriter().write(output);
    }

    public JSONObject getData(String query) throws IOException {
        URL obj = new URL(query);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();


        try{
            JSONTokener tokerner = new JSONTokener(response.toString());
            JSONObject jsonObject = new JSONObject(tokerner);
            return jsonObject;
        } catch(Exception ex){
            return null;
        }



    }
}