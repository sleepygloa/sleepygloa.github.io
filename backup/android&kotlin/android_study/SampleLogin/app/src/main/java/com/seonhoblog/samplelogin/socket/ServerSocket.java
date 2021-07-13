package com.seonhoblog.samplelogin.socket;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;

public class ServerSocket {

    public static void main(String[] args) {

        try {
            java.net.ServerSocket server = new java.net.ServerSocket(11001);
            System.out.println("Listening at port: 11001");

            while(true) {
                Socket aSocket = server.accept();
                System.out.println("A client Connected ");

                ObjectInputStream instream = new ObjectInputStream(aSocket.getInputStream());
                Object obj = instream.readObject();
                System.out.println("read Object : " + obj);

                ObjectOutputStream outstream = new ObjectOutputStream(aSocket.getOutputStream());
                outstream.writeObject(obj + " from Server.");
                outstream.flush();
                System.out.println("outStream is flushed : " + obj + " from Server.");

                aSocket.close();
                System.out.println("socket closed");

            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
