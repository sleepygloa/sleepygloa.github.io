package com.seonhoblog.samplelogin.layout;

import android.content.res.Resources;
import android.graphics.drawable.BitmapDrawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ScrollView;

import com.seonhoblog.samplelogin.R;


public class ScrollViewActivity extends AppCompatActivity {

    ScrollView scrollView;
    ImageView imageView;
    BitmapDrawable bitmap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_layout_scrollview);

        scrollView = (ScrollView) findViewById(R.id.scrollView);
        imageView = (ImageView) findViewById(R.id.imageView);
        scrollView.setHorizontalScrollBarEnabled(true); //수평스크롤바 사용기능

        Resources res = getResources(); // --> 저장된 리소스(프로잭트내) 자료 사용
        bitmap = (BitmapDrawable) res.getDrawable(R.drawable.back01);
        int bitmapWidth = bitmap.getIntrinsicWidth();
        int bitmapHeight = bitmap.getIntrinsicHeight();

        imageView.setImageDrawable(bitmap);
        imageView.getLayoutParams().width = bitmapWidth;
        imageView.getLayoutParams().height = bitmapHeight;


        Button buttonHor = (Button) findViewById(R.id.btn_layout_horScrollView);
        buttonHor.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View v) {
                changeImage();
            }
        });
    }

    private void changeImage(){
        Resources res = getResources(); // --> 저장된 리소스(프로잭트내) 자료 사용
        bitmap = (BitmapDrawable) res.getDrawable(R.drawable.back02);
        int bitmapWidth = bitmap.getIntrinsicWidth();
        int bitmapHeight = bitmap.getIntrinsicHeight();

        imageView.setImageDrawable(bitmap);
        imageView.getLayoutParams().width = bitmapWidth;
        imageView.getLayoutParams().height = bitmapHeight;


    }

}
