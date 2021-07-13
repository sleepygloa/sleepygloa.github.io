package com.seonhoblog.glideimg;

import android.annotation.SuppressLint;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.bumptech.glide.Glide;

public class MainActivity extends AppCompatActivity {

    ImageView imageView;

    @SuppressLint("WrongViewCast")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        imageView = (ImageView) findViewById(R.id.iv_back);

        findViewById(R.id.btn_start).setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                startLoadingBackImage();
            }
        });
    }
        private void startLoadingBackImage(){
            String url = "https://github.com/sleepygloa/study/blob/master/android_instgram/glideImg/back.jpg?raw=true";

            Glide.with(this).load(url).into(imageView);
        }

}
