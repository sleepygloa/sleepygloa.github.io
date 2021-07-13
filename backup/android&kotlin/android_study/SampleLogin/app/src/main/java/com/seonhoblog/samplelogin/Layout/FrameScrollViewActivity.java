package com.seonhoblog.samplelogin.layout;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.seonhoblog.samplelogin.R;

public class FrameScrollViewActivity extends AppCompatActivity {

    ImageView imageView;
    ImageView imageView2;
    int imageIndex = 0;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_layout_framescrollview);

        imageView = (ImageView) findViewById(R.id.btn_layout_framescroll_imageview1);
        imageView2 = (ImageView) findViewById(R.id.btn_layout_framescroll_imageview2);

        Button buttonFrameScrollImageChange = (Button) findViewById(R.id.btn_layout_framescroll_image_change);
        buttonFrameScrollImageChange.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                changeImage();
            }
        });
    }

    private void changeImage(){
        if(imageIndex == 0){
            imageView.setVisibility(View.VISIBLE);
            imageView2.setVisibility(View.INVISIBLE);

            imageIndex = 1;
        }else if(imageIndex == 1){
            imageView.setVisibility(View.INVISIBLE);
            imageView2.setVisibility(View.VISIBLE);

            imageIndex = 0;
        }
    }

}
