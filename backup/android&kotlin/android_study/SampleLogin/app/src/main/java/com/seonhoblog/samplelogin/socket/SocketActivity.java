package com.seonhoblog.samplelogin.socket;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.seonhoblog.samplelogin.R;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;

public class SocketActivity extends AppCompatActivity{

    EditText input01;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_socket);

        input01 = (EditText) findViewById(R.id.et_socket_showtext);

        // 버튼 이벤트 처리
        Button button01 = (Button) findViewById(R.id.btn_socket_connect);
        button01.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                String addr = input01.getText().toString().trim();

                SocketActivity.ConnectThread thread = new SocketActivity.ConnectThread(addr);
                thread.start();
            }
        });

    }

    /**
     * 소켓 연결할 스레드 정의
     */
    class ConnectThread extends Thread {
        String hostname;

        public ConnectThread(String addr) {
            hostname = addr;
        }

        public void run() {

            try {
                int port = 11001;

                Socket sock = new Socket(hostname, port);
                ObjectOutputStream outstream = new ObjectOutputStream(sock.getOutputStream());
                outstream.writeObject("Hello AndroidTown on Android");
                outstream.flush();

                ObjectInputStream instream = new ObjectInputStream(sock.getInputStream());
                String obj = (String) instream.readObject();

                Log.d("MainActivity", "서버에서 받은 메시지 : " + obj);

                sock.close();

            } catch(Exception ex) {
                ex.printStackTrace();
            }

        }
    }
}
