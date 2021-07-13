package com.seonhoblog.samplelogin.event;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.seonhoblog.samplelogin.R;

import org.w3c.dom.Text;

public class AnimationActivity extends AppCompatActivity {

    TextView textView;
    Animation flowAnim;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_animation);

        Button button = (Button) findViewById(R.id.btn_event_anim_button);
        textView = (TextView) findViewById(R.id.tv_event_anim_text);
        flowAnim = AnimationUtils.loadAnimation(this, R.anim.flow);
        flowAnim.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {

            }

            @Override
            public void onAnimationEnd(Animation animation) {
                Toast.makeText(getApplicationContext(), "애니메이션 종료됨", Toast.LENGTH_LONG).show();
            }

            @Override
            public void onAnimationRepeat(Animation animation) {

            }
        });

    }


}
