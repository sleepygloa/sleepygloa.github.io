package com.seonhoblog.okhttp;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.FileProvider;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.seonhoblog.okhttp.api.Api;
import com.seonhoblog.okhttp.api.Api.Post;
import com.seonhoblog.okhttp.uuid.UserUUID;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class TimelineFragment extends Fragment{

    ArrayList<Post> arrayList;
    PostViewAdapter postViewAdapter;
    Uri photoUri;
    File photoFile = null;


//    photoUri = FileProvider.getUriForFile(SelectPhotoDialogActivity.this,"com.example.test.provider", photoFile);
    public TimelineFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        fetchAsyncPosts();

        // Inflate the layout for this fragment
        View baseView = inflater.inflate(R.layout.fragment_timeline, container, false);
        RecyclerView recyclerView = (RecyclerView) baseView.findViewById(R.id.rv_list);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity(), LinearLayoutManager.VERTICAL, false));
        postViewAdapter = new PostViewAdapter();
        recyclerView.setAdapter(postViewAdapter);
        //카메라찍기
        baseView.findViewById(R.id.fab_post).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //실행전 허가 체크
                int permissionCheck = ContextCompat.checkSelfPermission(getActivity(),
                    Manifest.permission.READ_EXTERNAL_STORAGE);

                if(permissionCheck == PackageManager.PERMISSION_GRANTED){
                    startCameraActivity();
                }else{
                    ActivityCompat.requestPermissions(getActivity(),
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                    2000);
                }


            }
        });

        return baseView;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if(requestCode == 2000 && grantResults.length > 0){
            startCameraActivity();
        }

    }

    public void startCameraActivity() {
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if(cameraIntent.resolveActivity(getActivity().getPackageManager()) != null){
            startActivityForResult(cameraIntent, 1000);

        }

    }

    public void startGallery() {
        Intent cameraIntent = new Intent(Intent.ACTION_GET_CONTENT);
        cameraIntent.setType("image/*");
        if (cameraIntent.resolveActivity(getActivity().getPackageManager()) != null) {
            startActivityForResult(cameraIntent, 1000);
        }
    }

    /** main -> camera -> main -> post */

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == 1000 && resultCode == Activity.RESULT_OK){
            Log.d("onActivityResult", "Camera SUCCESS");
            Intent startIntent = new Intent(getActivity(), PostActivity.class);
//            startIntent.setData(data.getData());


            try {
                photoFile = createImageFile();
            } catch (IOException e) {
                Log.d("startCameraActivity", "ERROR 파일 생성오류");
//                Toast.makeText(startCameraActivity.this, "이미지 처리 오류! 다시 시도해주세요.", Toast.LENGTH_SHORT).show();              finish();
            }
            if (photoFile != null) {
                Log.d("startCameraActivity", "ERROR 파일 카메라 실행오류");
                photoUri = FileProvider.getUriForFile( getActivity(),
                        "com.seonhoblog.okhttp.provider", photoFile); //FileProvider의 경우 이전 포스트를 참고하세요.
                startIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri); //사진을 찍어 해당 Content uri를 photoUri에 적용시키기 위함
                startActivityForResult(startIntent, 1000);
            }


            startActivity(startIntent);
        }
    }


    // Android M에서는 Uri.fromFile 함수를 사용하였으나 7.0부터는 이 함수를 사용할 시 FileUriExposedException이
    // 발생하므로 아래와 같이 함수를 작성합니다. 이전 포스트에 참고한 영문 사이트를 들어가시면 자세한 설명을 볼 수 있습니다.
    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("HHmmss").format(new Date());
        String imageFileName = "IP" + timeStamp + "_";
        File storageDir = new File(Environment.getExternalStorageDirectory() + "/test/"); //test라는 경로에 이미지를 저장하기 위함
        if (!storageDir.exists()) {
            storageDir.mkdirs();
        }
        File image = File.createTempFile(
                imageFileName,
                ".jpg",
                storageDir
        );
        return image;
    }















    private void fetchAsyncPosts() {
        arrayList = new ArrayList<>();
        FetchPostsTask fetchPostsTask = new FetchPostsTask();
        fetchPostsTask.execute(Api.GET_POST);

    }

    interface OnLikeListener {
        void onLike(LikeTaskResponse response);
    }

    class FetchPostsTask extends AsyncTask<String, Void, Api.Post[]>{
        @Override
        protected Api.Post[] doInBackground(String... strings){

            String url = strings[0];

            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
                    .url(url)
                    .build();

            try {
                Response response = client.newCall(request).execute();

                Gson gson = new Gson();
                Api.Post[] posts = gson.fromJson(response.body().charStream(), Api.Post[].class);

                return posts;
            } catch (IOException e) {
                Log.d("FetchPostsTask", e.getMessage());
                return null;
            } catch(JsonSyntaxException e){
                Log.d("FetchPostsTask", e.getMessage());
                return null;
            }
       }

       @Override
        protected void onPostExecute(Api.Post[] posts){
            super.onPostExecute(posts);

            if(posts == null){return;}

            for(Api.Post post : posts){
                arrayList.add(post);
            }

            postViewAdapter.notifyDataSetChanged(); //자료가 바뀔때 갱신해달라는 메세지
       }

    }

    class PostViewAdapter extends RecyclerView.Adapter<PostViewHolder> {

        @Override
        public PostViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View baseView = getActivity().getLayoutInflater().inflate(R.layout.item_post, parent, false);
            PostViewHolder postViewHolder = new PostViewHolder(baseView);
            return postViewHolder;
        }

        @Override
        public void onBindViewHolder(PostViewHolder holder, int position) {

            Api.Post item = arrayList.get(position);

            String url = item.getIMG();
            Glide.with(TimelineFragment.this)
                    .load(Api.BASE_URL+url)
                    .into(holder.iv_post);

            holder.tv_username.setText(item.getIN_USER_ID());
            holder.tv_posttext.setText(item.getTEXT());
            holder.tv_postlikecount.setText( String.valueOf( item.getLIKES() ) );
            holder.chk_like.setChecked(item.isUserliked());
        }

        @Override
        public int getItemCount() {
            return arrayList.size();

        }

    }

    class PostViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        public TextView tv_username, tv_postlikecount, tv_posttext;
        public ImageView iv_post;
        public CheckBox chk_like;

        public PostViewHolder(View itemView) {
            super(itemView);
            iv_post = (ImageView) itemView.findViewById(R.id.iv_post_img);
            tv_username = (TextView) itemView.findViewById(R.id.tv_user_nickname);
            tv_postlikecount = (TextView) itemView.findViewById(R.id.tv_like_count);
            tv_posttext = (TextView) itemView.findViewById(R.id.tv_post_text);
            chk_like = (CheckBox) itemView.findViewById(R.id.chk_like);
            chk_like.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            final int position = getLayoutPosition();

            Api.Post post = arrayList.get(position);

            Log.d("Like", post.isUserliked() + "/" + post.getIN_USER_ID() + "/" + post.getIN_USER_ID());
            //좋아요 누른 사람의 좋아요유무 파악
            boolean like = !(post.isUserliked());

            LikeTaskRequest likeTaskRequest = new LikeTaskRequest(like, post.getIN_USER_ID(), post.getIN_USER_ID());
            LikeTask likeTask = new LikeTask(new OnLikeListener() {
                @Override
                public void onLike(LikeTaskResponse response) {
                    Api.Post post = arrayList.get(position);
                    post.setCount(response.getLikes());
                    post.setUserliked(response.isResult());
                    postViewAdapter.notifyDataSetChanged();
                }
            });
            likeTask.execute(likeTaskRequest);
        }

    }

    class LikeTaskRequest {

        boolean like;
        String post_id;
        String user_id;

        public LikeTaskRequest(boolean like, String post_id, String user_id) {
            this.like = like;
            this.post_id = post_id;
            this.user_id = user_id;
        }

        public boolean isLike() {
            return like;
        }

        public String getPost_id() {
            return post_id;
        }

        public String getUser_id() {
            return user_id;
        }
    }

    class LikeTaskResponse {
        boolean result;
        int likes;

        public boolean isResult() {
            return result;
        }

        public int getLikes() {
            return likes;
        }
    }

    class LikeTask extends AsyncTask<LikeTaskRequest, Void, LikeTaskResponse> {

        private OnLikeListener onLikeListener;

        public LikeTask(OnLikeListener onLikeListener) {
            this.onLikeListener = onLikeListener;
        }

        @Override
        protected LikeTaskResponse doInBackground(LikeTaskRequest... likeTaskRequests) {

            LikeTaskRequest likeInfo = likeTaskRequests[0];

            RequestBody requestBody = new FormBody.Builder()
                    .add("post_id", String.valueOf(likeInfo.getPost_id()))
                    .add("user_id", likeInfo.getUser_id())
                    .build();

            Request request;

            if (likeInfo.isLike()) {
                request = new Request.Builder()
                        .url(Api.POST_LIKE)
                        .post(requestBody)
                        .build();
            } else {
                request = new Request.Builder()
                        .url(Api.DEL_LIKE)
                        .delete(requestBody)
                        .build();
            }

            OkHttpClient okHttpClient = new OkHttpClient();

            try {
                Response response = okHttpClient.newCall(request).execute();

                if (response.code() == 200) {
                    Gson gson = new Gson();
                    LikeTaskResponse taskResponse = gson.fromJson(response.body().charStream(), LikeTaskResponse.class);
                    return taskResponse;
                } else {
                    return null;
                }

            } catch (IOException e) {
                Log.d("LikeTask", "Error", e);
                return null;
            }
        }

        @Override
        protected void onPostExecute(LikeTaskResponse likeTaskResponse) {
            super.onPostExecute(likeTaskResponse);
            onLikeListener.onLike(likeTaskResponse);
            Log.d("Like Response", likeTaskResponse.getLikes() + "/" + likeTaskResponse.isResult());
        }
    }

}
