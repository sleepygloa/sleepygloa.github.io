package com.seonhoblog.okhttp;

import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.ParcelFileDescriptor;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.seonhoblog.okhttp.api.Api;

import java.io.File;
import java.io.FileDescriptor;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class PostActivity extends AppCompatActivity {

    EditText etText;
    Bitmap thumbnail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post);

        Intent intent = getIntent();
        final Uri photoUri = intent.getData();
        Log.d("PostActivity", ""+photoUri);
        ImageView ivPost = (ImageView) findViewById(R.id.iv_post);
        etText = (EditText) findViewById(R.id.et_text);


        findViewById(R.id.btn_post).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                post(photoUri.toString(), etText.getText().toString());
            }
        });

        Glide.with(this)
                .load(photoUri)
                .into(ivPost);

        /** Uri content://media/external/images/media/255 */
        // Uri -> Bitmap -> File
    }

    private void post(String uriString, String textString){
        PostTask postTask = new PostTask();
        postTask.execute(uriString, textString);
    }


    class PostTask extends AsyncTask<String, Void, Boolean>{

        private ProgressDialog progressDialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            progressDialog = ProgressDialog.show(PostActivity.this, "포스트 업로드중", "잠시만 기다려주세요", true, false);
        }

        @Override
        protected Boolean doInBackground(String... strings) {
            /** 파일 준비과정 */
            Uri imageUri = Uri.parse(strings[0]);
            String text = strings[1];

            try{
                Bitmap bitmap = getBitmapFromUri(imageUri);
                File imageFile = createFileFromBitmap(bitmap);

                /** Http Post */
                RequestBody requestBody = new MultipartBody.Builder()
                        .setType(MultipartBody.FORM)
                        .addFormDataPart("in_user_id", "sleepygloa")
                        .addFormDataPart("text", text)
                        .addFormDataPart("image", makeImageFileName(),
                                RequestBody.create(MediaType.parse("image/png"), imageFile))
                        .build();

                Request request = new Request.Builder()
                        .url(Api.UP_POST)
                        .post(requestBody)
                        .build();

                /** OkHTTP 통신 설정  */
                OkHttpClient okHttpClient = new OkHttpClient.Builder()
                        .connectTimeout(20, TimeUnit.SECONDS)
                        .readTimeout(20, TimeUnit.SECONDS)
                        .writeTimeout(20, TimeUnit.SECONDS)
                        .build();

                Response response = okHttpClient.newCall(request).execute();

                return response.code() == 200;

            }catch(IOException e){
                Log.d("PostTask", "post failed", e);
                return false;
            }
        }

        @Override
        protected void onPostExecute(Boolean aBoolean) {
            super.onPostExecute(aBoolean);
            progressDialog.dismiss();
            if(aBoolean){
                Toast.makeText(PostActivity.this, "success", Toast.LENGTH_SHORT).show();
                Log.d("PostTask", "success");
            }else{
                Log.d("PostTask", "failed");
            }
        }
    }

    /** Uri -> Bitmap */
    public Bitmap getBitmapFromUri(Uri uri) throws IOException {

        ParcelFileDescriptor parcelFileDescriptor =
                getContentResolver().openFileDescriptor(uri, "r");
        FileDescriptor fileDescriptor = parcelFileDescriptor.getFileDescriptor();

        /** 비트맵 크기 측정하여 사이즈 줄이기  */
        BitmapFactory.Options opts = new BitmapFactory.Options();
        opts.inJustDecodeBounds = true;
        BitmapFactory.decodeFileDescriptor(fileDescriptor, null, opts);

        //4096 X 3800
        int width = opts.outWidth;
        int height = opts.outHeight;

        float sampleRatio = getSampleRatio(width, height);

        opts.inJustDecodeBounds = false;
        opts.inSampleSize = (int) sampleRatio;

        Bitmap resizedBitmap = BitmapFactory.decodeFileDescriptor(fileDescriptor, null, opts);

        Log.d("Resizing", "Resized Width / Height " + resizedBitmap.getWidth() + " / " + resizedBitmap.getHeight());

        parcelFileDescriptor.close();

        return resizedBitmap;
    }

    /** 크기 비율로 압축 */
    private float getSampleRatio(int width, int height) {
        final int targetWidth = 1280;
        final int targetHeight = 1280;

        float ratio;

        if(width > height){
            //Landscape
            if(width > targetWidth){
                ratio = (float)width / (float)targetWidth;
            }else{
                ratio = 1f;
            }
        }else{
            //Portrait
            if (height > targetHeight) {
                ratio = (float)height / (float)targetHeight;
            }else {
                ratio = 1f;
            }
        }
        return Math.round(ratio);
    }

    /** 파일 복사하기 */
    public File createFileFromBitmap(Bitmap bitmap) throws IOException {

        File newFile = new File(getFilesDir(), makeImageFileName());
        FileOutputStream fileOutputStream = new FileOutputStream(newFile);

        /** JPG  손실압축이라 1~100 수준이있지만, PNG  무손실압축이라 1과 100은 무의미  */
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, fileOutputStream);

        fileOutputStream.close();

        return newFile;
    }

    /** 파일이름 만들기 */
    private String makeImageFileName(){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd_hhmmss");
        Date date = new Date();
        String strDate = simpleDateFormat.format(date);
        return strDate+".png";
    }

}
