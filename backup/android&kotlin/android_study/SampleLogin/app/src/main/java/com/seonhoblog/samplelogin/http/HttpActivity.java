package com.seonhoblog.samplelogin.http;

import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.seonhoblog.samplelogin.R;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpActivity extends AppCompatActivity {

    EditText input01;
    TextView txtMsg;

    public static String defaultUrl = "http://m.naver.com";

    Handler handler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_http);

        input01 = (EditText) findViewById(R.id.et_http_address);
        input01.setText(defaultUrl);

        txtMsg = (TextView) findViewById(R.id.tv_http_show_response);

        // 버튼 이벤트 처리
        Button requestBtn = (Button) findViewById(R.id.btn_http_address_request);
        requestBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                String urlStr = input01.getText().toString();

                HttpActivity.ConnectThread thread = new HttpActivity.ConnectThread(urlStr);
                thread.start();

            }
        });

    }

    /**
     * 소켓 연결할 스레드 정의
     */
    class ConnectThread extends Thread {
        String urlStr;

        public ConnectThread(String inStr) {
            urlStr = inStr;
        }

        public void run() {

            try {
                final String output = request(urlStr);
                handler.post(new Runnable() {
                    public void run() {
                        txtMsg.setText(output);
                    }
                });

            } catch(Exception ex) {
                ex.printStackTrace();
            }

        }


        private String request(String urlStr) {
            StringBuilder output = new StringBuilder();
            try {
                URL url = new URL(urlStr);
                HttpURLConnection conn = (HttpURLConnection)url.openConnection();
                if (conn != null) {
                    conn.setConnectTimeout(10000);
                    conn.setRequestMethod("GET");
                    conn.setDoInput(true);
                    conn.setDoOutput(true);

                    int resCode = conn.getResponseCode();

                    BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream())) ;
                    String line = null;
                    while(true) {
                        line = reader.readLine();
                        if (line == null) {
                            break;
                        }
                        output.append(line + "\n");
                    }

                    reader.close();
                    conn.disconnect();
                }
            } catch(Exception ex) {
                Log.e("SampleHTTP", "Exception in processing response.", ex);
                ex.printStackTrace();
            }

            return output.toString();
        }

    }

}
