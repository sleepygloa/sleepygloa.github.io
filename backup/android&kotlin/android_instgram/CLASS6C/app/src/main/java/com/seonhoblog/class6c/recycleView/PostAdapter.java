package com.seonhoblog.class6c.recycleView;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.seonhoblog.class6c.R;
import com.seonhoblog.class6c.model.PostItem;

import java.util.ArrayList;

public class PostAdapter extends RecyclerView.Adapter<PostingViewHolder> {

    private Context mContext;
    private ArrayList<PostItem> postItems;

    public PostAdapter(Context context, ArrayList<PostItem> listItem){
        mContext = context;
        postItems = listItem;
    }

    @NonNull
    @Override
    public PostingViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View baseView = View.inflate(mContext, R.layout.post_item, null);
        PostingViewHolder postingViewHolder = new PostingViewHolder(baseView, this);

        return postingViewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull PostingViewHolder holder, int position) {
        PostItem item = postItems.get(position);

        holder.tvUserName.setText(item.getUserName());
        holder.tvPostText.setText(item.getPostText());
        holder.tvLikeCount.setText(String.valueOf(item.getPostLikeCount()));
    }

    @Override
    public int getItemCount() {
        return postItems.size();
    }

    public void onLikeClicked(int position){
        PostItem item = postItems.get(position);
        Toast.makeText(mContext,  position +" : " + item.getPostText(), Toast.LENGTH_SHORT).show();
    }
}
