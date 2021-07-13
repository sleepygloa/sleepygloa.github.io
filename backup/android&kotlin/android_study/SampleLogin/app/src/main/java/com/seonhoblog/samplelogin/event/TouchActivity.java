package com.seonhoblog.samplelogin.event;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

import com.seonhoblog.samplelogin.R;

public class TouchActivity extends AppCompatActivity {

    TextView textView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_touch);

        textView = (TextView) findViewById(R.id.tv_event_text);

        View view = findViewById(R.id.v_event_view);
        view.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent motionEvent) {
                int action = motionEvent.getAction();

                float curX = motionEvent.getX();
                float curY = motionEvent.getY();

                if(action == MotionEvent.ACTION_DOWN){
                    println("손가락 눌림 : " + curX + ", " + curY);
                }else if(action == MotionEvent.ACTION_MOVE){
                    println("손가락 움직임 : " + curX + ", " + curY);
                }else{
                    println("손가락 뗌 : " + curX + ", " + curY);
                }

                return true;
            }
        });


        final GestureDetector detector;
        detector = new GestureDetector(this, new GestureDetector.OnGestureListener() {
            @Override
            public boolean onDown(MotionEvent motionEvent) {
                println("onDown() 호출됨 ");
                return true;
            }

            @Override
            public void onShowPress(MotionEvent motionEvent) {
                println("onShowPress() 호출됨 ");
            }

            @Override
            public boolean onSingleTapUp(MotionEvent motionEvent) {
                println("onSingleTapUp() 호출됨 ");
                return true;
            }

            @Override
            public boolean onScroll(MotionEvent motionEvent1, MotionEvent motionEvent2,
                                    float x, float y) {
                println("onScroll() 호출됨 : " + x + ", " + y);
                return true;
            }

            @Override
            public void onLongPress(MotionEvent motionEvent) {
                println("onLongPress() 호출됨");
            }

            @Override
            public boolean onFling(MotionEvent motionEvent1, MotionEvent motionEvent2, float x, float y) {
                println("onFling() 호출됨 : " + x + ", " + y);
                return true;
            }
        });

        View view2 = findViewById(R.id.v_event_view);
        view2.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent motionEvent) {
                detector.onTouchEvent(motionEvent);
                return true;

            }
        });

    }

    public void println(String data){
        textView.append(data + "\n");
    }


}
