package com.seonhoblog.class6c.recycleView;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import com.seonhoblog.class6c.R;

public class PostingViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

    public CheckBox cbLike;
    public ImageView ivImg, ivShare;
    public TextView tvLikeCount, tvUserName, tvPostText;
    private PostAdapter mAdapter;

    public PostingViewHolder(View itemView, PostAdapter postAdapter) {
        super(itemView);
        mAdapter = postAdapter;
        ivImg = (ImageView) itemView.findViewById(R.id.iv_img);
        cbLike = (CheckBox) itemView.findViewById(R.id.cb_like);
        ivShare = (ImageView) itemView.findViewById(R.id.iv_share);

        tvLikeCount = (TextView) itemView.findViewById(R.id.tv_likeCount);
        tvUserName = (TextView) itemView.findViewById(R.id.tv_userName);
        tvPostText = (TextView) itemView.findViewById(R.id.tv_postText);

        cbLike.setOnClickListener(this);
        ivShare.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {

        int position = getAdapterPosition();

        switch(view.getId()){
            case R.id.cb_like:
                mAdapter.onLikeClicked(position);
                break;

            case R.id.iv_share:
                break;
        }



    }
}
