package com.seonhoblog.samplelogin;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    int REQUEST_ACT = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button button = (Button) findViewById(R.id.btn_login);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toMenu();
            }
        });

    }

    public void toMenu(){
        Intent intent = new Intent(MainActivity.this, MenuActivity.class);
        startActivityForResult(intent, REQUEST_ACT);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data){
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == 1){

            if(resultCode == RESULT_OK){
                Toast.makeText(MainActivity.this, "되는건가요", Toast.LENGTH_SHORT).show();
            }
        }
    }

}
