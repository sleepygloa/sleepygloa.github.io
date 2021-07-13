package com.seonhoblog.samplelogin.loadContents;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.seonhoblog.samplelogin.R;

import java.io.File;

public class loadPDFActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_load_pdf);

        final EditText edPdfName = (EditText) findViewById(R.id.edit_load_pdf_name);
        Button btnPdf = (Button) findViewById(R.id.btn_load_pdf);
        btnPdf.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String pdfName = edPdfName.getText().toString();
                openPdf(pdfName);
            }
        });
    }

    private void openPdf(String filename){
        String sdcardHolder = Environment.getExternalStorageDirectory().getAbsolutePath();
        String filepath = sdcardHolder + File.separator + filename;

        File file = new File(filepath);
        if(file.exists()){
            Uri uri = Uri.fromFile(file);

            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setDataAndType(uri, "application/pdf");

            try{
                startActivity(intent);
            }catch(ActivityNotFoundException e){
                Toast.makeText(this, "PDF 파일을 보기 위한 뷰어앱이 없습니다.", Toast.LENGTH_SHORT).show();
            }

        }else{
            Toast.makeText(this,"PDF 파일이 없습니다.", Toast.LENGTH_SHORT).show();
        }
    }

}
