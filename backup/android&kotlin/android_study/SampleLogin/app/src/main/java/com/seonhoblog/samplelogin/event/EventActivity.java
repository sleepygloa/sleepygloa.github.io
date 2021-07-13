package com.seonhoblog.samplelogin.event;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;

import com.seonhoblog.samplelogin.R;


public class EventActivity extends AppCompatActivity{

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event);

        Button btnTouch = (Button) findViewById(R.id.btn_event_touch);
        Button btnDialog = (Button) findViewById(R.id.btn_event_dialog);
        Button btnProgress = (Button) findViewById(R.id.btn_event_progress);


        btnTouch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toTouch();
            }
        });
        btnDialog.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toDialog();
            }
        });
        btnProgress.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toProgress();
            }
        });
    }

    private void toTouch(){
        Intent intent = new Intent(this, TouchActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toDialog(){
        Intent intent = new Intent(this, DialogActivity.class);
        setResult(RESULT_OK);
        finish();
    }

    private void toProgress(){
        Intent intent = new Intent(this, ProgressBar.class);
        setResult(RESULT_OK);
        finish();
    }

}
