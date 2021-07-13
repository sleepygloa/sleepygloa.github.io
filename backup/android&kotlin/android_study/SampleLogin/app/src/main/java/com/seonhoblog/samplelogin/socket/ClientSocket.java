package com.seonhoblog.samplelogin.socket;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;

public class ClientSocket {

    public static void main(String[] args) {

        try {
            Socket aSocket = new Socket("localhost", 11001);
            System.out.println("new socket localpost port :  11001");

            ObjectOutputStream outstream = new ObjectOutputStream(aSocket.getOutputStream());
            outstream.writeObject("Hello.");
            outstream.flush();
            System.out.println("flushed : Hello.");

            ObjectInputStream instream = new ObjectInputStream(aSocket.getInputStream());
            Object obj = instream.readObject();
            System.out.println("read : " + obj);

            aSocket.close();
            System.out.println("closed");

        } catch(Exception ex) {
            ex.printStackTrace();
        }
    }

}
