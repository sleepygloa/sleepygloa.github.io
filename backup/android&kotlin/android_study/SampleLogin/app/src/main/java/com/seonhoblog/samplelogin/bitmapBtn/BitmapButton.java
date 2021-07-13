package com.seonhoblog.samplelogin.bitmapBtn;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.support.v7.widget.AppCompatButton;
import android.util.AttributeSet;
import android.view.MotionEvent;

import com.seonhoblog.samplelogin.R;

public class BitmapButton extends AppCompatButton {

    int iconNormal = R.drawable.back01;
    int iconClicked = R.drawable.back02;

    int iconStatus = STATUS_NORMAL;
    public static int STATUS_NORMAL = 0;
    public static int STATUS_CLICKED = 1;

    //소스 코드에서 객체를 생성했을 때 호출되는 생성자
    public BitmapButton(Context context){
        super(context);

        init();
    }

    //XML에 추가된 버튼이 인플레이션 될 때 호출되는 생성자
    public BitmapButton(Context context, AttributeSet atts){
        super(context, atts);
        init();
    }

    public void init(){
        setBackgroundResource(iconNormal);

        int defaultTextColor = Color.WHITE;
        float defaultTextSize = getResources().getDimension(R.dimen.text_size);
        Typeface defaultTypeface = Typeface.DEFAULT_BOLD;

        setTextColor(defaultTextColor);
        setTextSize(defaultTextSize);
        setTypeface(defaultTypeface);
    }

    public void setIcon(int iconNormal, int iconClicked){
        this.iconNormal = iconNormal;
        this.iconClicked = iconClicked;
    }

    public boolean onTouchEvent(MotionEvent event){
        super.onTouchEvent(event);

        int action = event.getAction();

        switch (action){
            case MotionEvent.ACTION_DOWN:
                setBackgroundResource(this.iconClicked);

                iconStatus = STATUS_CLICKED;

                break;

            case MotionEvent.ACTION_OUTSIDE:
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                setBackgroundResource(this.iconNormal);

                iconStatus = STATUS_NORMAL;

                break;
        }

        //다시 그리기
        invalidate();
        return true;


    }


}
