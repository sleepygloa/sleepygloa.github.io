package com.seonhoblog.samplelogin.event;

import android.content.DialogInterface;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.seonhoblog.samplelogin.R;

public class DialogActivity extends AppCompatActivity {

    TextView textView;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
        setContentView(R.layout.activity_event_dialog);

        textView = (TextView) findViewById(R.id.tv_event_dialog_text);

        Button button = (Button) findViewById(R.id.btn_event_dialog_Show);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showMessage();
            }
        });

    }

    private void showMessage(){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("안내");
        builder.setMessage("종료하시겠습니까?");
        builder.setIcon(android.R.drawable.ic_dialog_alert);

        builder.setPositiveButton("예", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String message = "예 버튼이 눌렸습니다.";
                textView.setText(message);
            }
        });

        builder.setNeutralButton("취소", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String message = "취소 버튼이 눌렸습니다.";
                textView.setText(message);
            }
        });

        builder.setNeutralButton("아니오", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String message = "아니오 버튼이 눌렸습니다.";
                textView.setText(message);
            }
        });

        AlertDialog dialog = builder.create();
        dialog.show();
    }



}
