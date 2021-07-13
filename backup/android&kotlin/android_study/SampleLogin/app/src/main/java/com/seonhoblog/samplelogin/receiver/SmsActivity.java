package com.seonhoblog.samplelogin.receiver;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.seonhoblog.samplelogin.MainActivity;
import com.seonhoblog.samplelogin.R;

public class SmsActivity extends AppCompatActivity {
    EditText editText;
    EditText editText2;
    EditText editText3;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_receiver_sms);

        int permissionCheck = ContextCompat.checkSelfPermission(this,
                Manifest.permission.RECEIVE_SMS);
        if(permissionCheck == PackageManager.PERMISSION_GRANTED){
            Toast.makeText(this, "SMS 수신권한있음.", Toast.LENGTH_SHORT).show();
        }else{
            Toast.makeText(this, "SMS 수신권한없음.", Toast.LENGTH_SHORT).show();
            if(ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.RECEIVE_SMS)){
                Toast.makeText(this, "SMS 권한 설명 필요함.", Toast.LENGTH_SHORT).show();


            }else{
                ActivityCompat.requestPermissions(this,
                        new String[] {Manifest.permission.RECEIVE_SMS}, 1);
            }
        }


        editText = (EditText) findViewById(R.id.edit_receiver_text);
        editText2 = (EditText) findViewById(R.id.edit_receiver_text2);
        editText3 = (EditText) findViewById(R.id.edit_receiver_text3);
        Button button = (Button) findViewById(R.id.btn_receiver_button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        Intent passedIntent = getIntent();
        processIntent(passedIntent);
    }

    protected  void onNewIntent(Intent intent){
        processIntent(intent);

        super.onNewIntent(intent);
    }

    private void processIntent(Intent intent) {
        if (intent != null) {
            String sender = intent.getStringExtra("sender");
            String contents = intent.getStringExtra("contents");
            String receivedDate = intent.getStringExtra("receivedDate");

            editText.setText(sender);
            editText2.setText(contents);
            editText3.setText(receivedDate);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        switch (requestCode){
            case 1 :{
                if(grantResults.length > 0 &&
                        grantResults[0] == PackageManager.PERMISSION_GRANTED){
                    Toast.makeText(this, "SMS 권한을 사용자가 승인함.",
                            Toast.LENGTH_SHORT).show();

                }else{
                    Toast.makeText(this, "SMS 권한 거부됨.", Toast.LENGTH_SHORT).show();
                }
            }

            return;
        }
    }
}
