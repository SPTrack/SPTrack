package slack;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.memoria.Memoria;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;



public class Pipefy {

    public Pipefy() {
       
    }

    public void enviarAlerta(String mensagem) {
        try {
            OkHttpClient client = new OkHttpClient();
            MediaType mediaType = MediaType.parse("application/json");
            RequestBody body = RequestBody.create(mediaType, String.format("{\"query\":\"mutation{   createCard(input:{     pipe_id:302793571,    fields_attributes:[     {field_id:\\\"qual_o_assunto_do_seu_pedido\\\",       field_value:\\\"%s\\\"},     {field_id:\\\"email\\\",field_value:\\\"%s\\\"},     {field_id:\\\"data_e_hora\\\",field_value:\\\"30/10/2022 01:58\\\"},     {field_id:\\\"nome_do_funcion_rio\\\",field_value:\\\"%s\\\"}   ] }) {     card {      id title     }   }   }\"}", mensagem));

            Request request = new Request.Builder()
                    .url("https://api.pipefy.com/graphql")
                    .post(body)
                    .addHeader("accept", "application/json")
                    .addHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIwNzc1MzAsImVtYWlsIjoibWFyaWEubmV2ZXNAc3B0ZWNoLnNjaG9vbCIsImFwcGxpY2F0aW9uIjozMDAyMTQwNzN9fQ.y2SAHLixTf8FwwoXb7lXvPAIWXmw7rYwqlbFuDMqpaRk3iiq81x04i9BeX-dHWzE6jNS-21VG_SH_oBBqoOSpg")
                    /*"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIwODMxNjcsImVtYWlsIjoiZ3VpbGhlcm1lLmFiYXJyb3NAc3B0ZWNoLnNjaG9vbCIsImFwcGxpY2F0aW9uIjozMDAyMDk3MjJ9fQ.F1Bg7s6kjT_BoHO2MI4ILjW8ayv_2YUqnJWJeRbXAkigJmMIpDUY2BMoMw_5qo9oKt8Wbm5akcMs0XMCxAnHMg"*/
                    .addHeader("Content-Type", "application/json")
                    .build();

            Response response = client.newCall(request).execute();
            System.out.println(response);
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
