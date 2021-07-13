package com.seonhoblog.samplelogin.layout;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import com.seonhoblog.samplelogin.MainActivity;
import com.seonhoblog.samplelogin.R;


public class LayoutActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_layout);

        Button buttonToMain = (Button) findViewById(R.id.btn_layout_tomain);
        Button buttonLinear = (Button) findViewById(R.id.btn_layout_linear);
        Button buttonRelative = (Button) findViewById(R.id.btn_layout_relative);
        Button buttonGrid = (Button) findViewById(R.id.btn_layout_grid);
        Button buttonFrame = (Button) findViewById(R.id.btn_layout_frame);
        Button bottonTotal = (Button) findViewById(R.id.btn_layout_total);
        Button buttonContraint = (Button) findViewById(R.id.btn_layout_contraint);
        Button buttonFrameScroll = (Button) findViewById(R.id.btn_layout_framescoll);

        buttonToMain.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                toPage(MainActivity.class);
            }
        });
        buttonLinear.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                toPage(MainActivity.class);
            }
        });
        buttonRelative.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                toPage(MainActivity.class);
            }
        });
        buttonGrid.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                toPage(MainActivity.class);
            }
        });
        buttonFrame.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                toPage(MainActivity.class);
            }
        });
        bottonTotal.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                toPage(TotalViewActivity.class);
            }
        });
        buttonContraint.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                toPage(ContraintViewActivity.class);
            }
        });
        buttonContraint.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                toPage(FrameScrollViewActivity.class);
            }
        });
    }

    private void toPage(Class activity){
        Intent intent = new Intent(getApplicationContext(), activity);
        startActivity(intent);
    }



}
