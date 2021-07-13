package com.seonhoblog.samplelogin.service;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.seonhoblog.samplelogin.R;

public class ServiceActivity extends AppCompatActivity {

    EditText editTextName;
    Button btnServiceName;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_service);

        editTextName = (EditText) findViewById(R.id.edit_service_text_name);
        btnServiceName = (Button) findViewById(R.id.btn_service_name);

        btnServiceName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toService();
            }
        });

        Intent passedIntent = getIntent();
        processIntent(passedIntent);
    }

    private void toService(){
        String name = editTextName.getText().toString();

        Intent intent = new Intent(this, MyService.class);
    }

    @Override
    protected void onNewIntent(Intent intent){
        processIntent(intent);

        super.onNewIntent(intent);
    }

    private void processIntent(Intent intent){
        if(intent != null){
            String command = intent.getStringExtra("command");
            String name = intent.getStringExtra("name");

            Toast.makeText(this, "command : " + command + ", name : " + name, Toast.LENGTH_SHORT).show();
        }
    }

}
