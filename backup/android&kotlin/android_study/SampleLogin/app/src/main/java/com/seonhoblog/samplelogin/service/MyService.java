package com.seonhoblog.samplelogin.service;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;

import com.seonhoblog.samplelogin.MainActivity;

public class MyService extends Service{

    private static final String TAG = "MyService";

    public MyService(){

    }

    @Override
    public void onCreate() {
        super.onCreate();

        Log.d(TAG, "onCreate() 호출됨 ");
    }

//    @Override
//    public int onStart(Intent intent, int startId) {
//        super.onStart(intent, startId);
//
//        Log.d(TAG, "onStart() 호출됨 ");
//
//        if(intent == null) {
//            return Service.START_STICKY;
//        }else{
//            processCommand(intent);
//        }
//
//        return super.onStartCommand(intent, 0, startId);
//    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void processCommand(Intent intent){
        String command = intent.getStringExtra("command");
        String name = intent.getStringExtra("name");

        Log.d(TAG, "command :" + command + ", name : " + name);

        Intent showIntent = new Intent(getApplicationContext(), MainActivity.class);
        showIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK |
                            Intent.FLAG_ACTIVITY_SINGLE_TOP |
                            Intent.FLAG_ACTIVITY_CLEAR_TOP);
        showIntent.putExtra("command", "show");
        showIntent.putExtra("name", name + " from service");
        startActivity(showIntent);

    }
}
