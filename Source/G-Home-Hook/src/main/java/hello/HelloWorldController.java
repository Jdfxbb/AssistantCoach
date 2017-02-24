package hello;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import org.json.simple.*;


@Controller
@RequestMapping("/webhook")
public class HelloWorldController {

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody WebhookResponse webhook(@RequestBody String obj){

        System.out.println(obj);
        JSONParser jsonParser = new JSONParser();
        try {
            JSONObject jsonObject = (JSONObject) jsonParser.parse(obj);
            JSONObject objj = (org.json.simple.JSONObject)jsonObject.get("body");
            String home = objj.get("home").toString();
            String command = objj.get("command").toString();
            String parameter = objj.get("parameter").toString();
            String method = objj.get("method").toString();

            String query = home  + " " + command  + " " + parameter  + " " + method;

            return new WebhookResponse(query,query);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
