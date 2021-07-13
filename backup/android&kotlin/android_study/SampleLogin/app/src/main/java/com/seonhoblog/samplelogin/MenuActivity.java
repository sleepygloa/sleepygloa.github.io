package com.seonhoblog.samplelogin;

import android.content.Intent;
import android.media.AudioRecord;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import com.seonhoblog.samplelogin.asyncTask.AsyncTaskActivity;
import com.seonhoblog.samplelogin.bitmapBtn.BitmapBtnActivity;
import com.seonhoblog.samplelogin.cameraImgModify.ImgCoverFlowActivity;
import com.seonhoblog.samplelogin.createDb.CreateDbActivity;
import com.seonhoblog.samplelogin.createDb.CreateDbSelectActivity;
import com.seonhoblog.samplelogin.fragment.FragmentActivity;
import com.seonhoblog.samplelogin.graphAnimation.GraphAnimActivity;
import com.seonhoblog.samplelogin.http.HttpActivity;
import com.seonhoblog.samplelogin.keypad.KeypadActivity;
import com.seonhoblog.samplelogin.layout.LayoutActivity;
import com.seonhoblog.samplelogin.event.EventActivity;
import com.seonhoblog.samplelogin.listView.ListViewActivity;
import com.seonhoblog.samplelogin.location.GpsActivity;
import com.seonhoblog.samplelogin.location.MapActivity;
import com.seonhoblog.samplelogin.multimedia.AudioActivity;
import com.seonhoblog.samplelogin.multimedia.AudioRecordActivity;
import com.seonhoblog.samplelogin.multimedia.CameraPickSaveActivity;
import com.seonhoblog.samplelogin.multimedia.VideoActivity;
import com.seonhoblog.samplelogin.multimedia.VideoRecordActivity;
import com.seonhoblog.samplelogin.multitouch.MultiTouchActivity;
import com.seonhoblog.samplelogin.push.PushActivity;
import com.seonhoblog.samplelogin.receiver.SmsActivity;
import com.seonhoblog.samplelogin.rss.RssActivity;
import com.seonhoblog.samplelogin.service.ServiceActivity;
import com.seonhoblog.samplelogin.socket.SocketActivity;
import com.seonhoblog.samplelogin.tapMenu.TapMenuActivity;
import com.seonhoblog.samplelogin.thread.ThreadActivity;
import com.seonhoblog.samplelogin.web.WebActivity;
import com.seonhoblog.samplelogin.widget.WidgetIntroActivity;

public class MenuActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);

        Button btnLayout = (Button) findViewById(R.id.btn_layout);
        Button button5 = (Button) findViewById(R.id.btn_receiver);
        Button btnEvent = (Button) findViewById(R.id.btn_event);
        Button btnFlagment = (Button) findViewById(R.id.btn_flagment);
        Button btnTapMenu = (Button) findViewById(R.id.btn_tabMenu);
        Button btnWeb = (Button) findViewById(R.id.btn_web);
        Button btnKeypad = (Button) findViewById(R.id.btn_keypad);
        Button btnBitmapBtn = (Button) findViewById(R.id.btn_bitmapBtn);
        Button btnListView = (Button) findViewById(R.id.btn_listview);
        Button btnMultiTouch = (Button) findViewById(R.id.btn_multitouch);
        Button btnPaintBoard = (Button) findViewById(R.id.btn_paintboard);
        Button btnImgCoverFlow = (Button) findViewById(R.id.btn_imgcoverflow);
        Button btnThread = (Button) findViewById(R.id.btn_thread);
        Button btnAsyncTask = (Button) findViewById(R.id.btn_asyncTask);
        Button btnGraphAnim = (Button) findViewById(R.id.btn_graphanim);
        Button btnSocket = (Button) findViewById(R.id.btn_socket);
        Button btnHttp = (Button) findViewById(R.id.btn_http);
        Button btnRss = (Button) findViewById(R.id.btn_rss);
        Button btnCreateDb = (Button) findViewById(R.id.btn_createdb);
        Button btnCreateDbSelect = (Button) findViewById(R.id.btn_createdb_select);
        Button btnAudio = (Button) findViewById(R.id.btn_audio);
        Button btnAudioRecord = (Button) findViewById(R.id.btn_audio_record);
        Button btnVideo = (Button) findViewById(R.id.btn_video);
        Button btnVideoRecord = (Button) findViewById(R.id.btn_video_record);
        Button btnCameraPickSave = (Button) findViewById(R.id.btn_camerapicksave);
        Button btnGps = (Button) findViewById(R.id.btn_gps);
        Button btnMap = (Button) findViewById(R.id.btn_map);
        Button btnWidget = (Button) findViewById(R.id.btn_widget);
        Button btnPush = (Button) findViewById(R.id.btn_push);



        btnLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toLayout();
            }
        });
        button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toReceiver();
            }
        });
        btnEvent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toEvent();
            }
        });
        btnFlagment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toFlagment();
            }
        });
        btnTapMenu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toTapMenu();
            }
        });
        btnWeb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toWeb();
            }
        });
        btnKeypad.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toKeypad();
            }
        });
        btnBitmapBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toBitmapBtn();
            }
        });
        btnListView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toListView();
            }
        });
        btnMultiTouch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toMultiTouch();
            }
        });
        btnPaintBoard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toPaintBoard();
            }
        });
        btnImgCoverFlow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toImgCoverFlow();
            }
        });
        btnThread.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toThread();
            }
        });
        btnAsyncTask.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toAsyncTask();
            }
        });
        btnGraphAnim.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toGraphAnim();
            }
        });
        btnSocket.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toSocket();
            }
        });
        btnHttp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toHttp();
            }
        });
        btnRss.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toRss();
            }
        });
        btnCreateDb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toCreateDb();
            }
        });
        btnCreateDbSelect.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toCreateDbSelect();
            }
        });
        btnAudio.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toAudio();
            }
        });
        btnAudioRecord.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toAudioRecord();
            }
        });
        btnVideo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toVideo();
            }
        });
        btnVideoRecord.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toVideoRecord();
            }
        });
        btnCameraPickSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toCameraPickSave();
            }
        });
        btnGps.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toGps();
            }
        });
        btnMap.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toMap();
            }
        });
        btnWidget.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toWidget();
            }
        });
        btnPush.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toPush();
            }
        });


    }

    private void toLayout(){
        Intent intent = new Intent(MenuActivity.this, LayoutActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toService(){
        Intent intent = new Intent(MenuActivity.this, ServiceActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toReceiver(){
        Intent intent = new Intent(MenuActivity.this, SmsActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toLogin(){
        Intent intent = new Intent();
        setResult(RESULT_OK);
        finish();
    }

    private void toEvent(){
        Intent intent = new Intent(MenuActivity.this, EventActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toFlagment(){
        Intent intent = new Intent(MenuActivity.this, FragmentActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toTapMenu(){
        Intent intent = new Intent(MenuActivity.this, TapMenuActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toWeb(){
        Intent intent = new Intent (MenuActivity.this, WebActivity.class);
        setResult(RESULT_OK);
        finish();
    }
    private void toKeypad(){
        Intent intent = new Intent (MenuActivity.this, KeypadActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toBitmapBtn(){
        Intent intent = new Intent (MenuActivity.this, BitmapBtnActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toListView(){
        Intent intent = new Intent (MenuActivity.this, ListViewActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toMultiTouch(){
        Intent intent = new Intent (MenuActivity.this, MultiTouchActivity.class);
        setResult(RESULT_OK);
        finish();
    }
    private void toPaintBoard(){
        Intent intent = new Intent (MenuActivity.this, MultiTouchActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toImgCoverFlow(){
        Intent intent = new Intent (MenuActivity.this, ImgCoverFlowActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toThread(){
        Intent intent = new Intent (MenuActivity.this, ThreadActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toAsyncTask(){
        Intent intent = new Intent (MenuActivity.this, AsyncTaskActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toGraphAnim(){
        Intent intent = new Intent (MenuActivity.this, GraphAnimActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toSocket(){
        Intent intent = new Intent (MenuActivity.this, SocketActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toHttp(){
        Intent intent = new Intent (MenuActivity.this, HttpActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toRss(){
        Intent intent = new Intent (MenuActivity.this, RssActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toCreateDb(){
        Intent intent = new Intent (MenuActivity.this, CreateDbActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toCreateDbSelect(){
        Intent intent = new Intent (MenuActivity.this, CreateDbSelectActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toAudio(){
        Intent intent = new Intent (MenuActivity.this, AudioActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toAudioRecord(){
        Intent intent = new Intent (MenuActivity.this, AudioRecordActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toVideo(){
        Intent intent = new Intent (MenuActivity.this, VideoActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toVideoRecord(){
        Intent intent = new Intent (MenuActivity.this, VideoRecordActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toCameraPickSave(){
        Intent intent = new Intent (MenuActivity.this, CameraPickSaveActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toGps(){
        Intent intent = new Intent (MenuActivity.this, GpsActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toMap(){
        Intent intent = new Intent (MenuActivity.this, MapActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toWidget(){
        Intent intent = new Intent (MenuActivity.this, WidgetIntroActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toPush(){
        Intent intent = new Intent (MenuActivity.this, PushActivity.class);
        setResult(RESULT_OK);
        finish();
    }
}
