package com.seonhoblog.updownimgtoggle;

import android.content.res.Resources;
import android.graphics.drawable.BitmapDrawable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

public class MainActivity extends AppCompatActivity {

    ImageView imgViewTop;
    ImageView imgViewBottom;
    Button btnUp;
    Button btnDown;

    BitmapDrawable bitmap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnUp = (Button) findViewById(R.id.btn_up);
        btnDown = (Button) findViewById(R.id.btn_down);
        imgViewTop = (ImageView) findViewById(R.id.img_top);
        imgViewBottom = (ImageView) findViewById(R.id.img_bottom);

        imgViewBottom.setImageDrawable(null);

        Resources res = getResources();
        bitmap = (BitmapDrawable) res.getDrawable(R.drawable.back);
        int bitmapWidth = bitmap.getIntrinsicWidth();
        int bitmapHeight = bitmap.getIntrinsicHeight();

        imgViewTop.setImageDrawable(bitmap);
        imgViewTop.getLayoutParams().width = bitmapWidth;
        imgViewTop.getLayoutParams().height = bitmapHeight;
    }

    public void onClickUpImg(View v){
        moveImgUp();
    }

    public void onClickDownImg(View v){
        moveImgDown();
    }

    private void moveImgUp(){
        imgViewBottom.setImageDrawable(null);

        Resources res = getResources();
        bitmap = (BitmapDrawable) res.getDrawable(R.drawable.back);
        int bitmapWidth = bitmap.getIntrinsicWidth();
        int bitmapHeight = bitmap.getIntrinsicHeight();

        imgViewTop.setImageDrawable(bitmap);
        imgViewTop.getLayoutParams().width = bitmapWidth;
        imgViewTop.getLayoutParams().height = bitmapHeight;
    }

    private void moveImgDown(){
        imgViewTop.setImageDrawable(null);

        Resources res = getResources();
        bitmap = (BitmapDrawable) res.getDrawable(R.drawable.back);
        int bitmapWidth = bitmap.getIntrinsicWidth();
        int bitmapHeight = bitmap.getIntrinsicHeight();

        imgViewBottom.setImageDrawable(bitmap);
        imgViewBottom.getLayoutParams().width = bitmapWidth;
        imgViewBottom.getLayoutParams().height = bitmapHeight;
    }

}
