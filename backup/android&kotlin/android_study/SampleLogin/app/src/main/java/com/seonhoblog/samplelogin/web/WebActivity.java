package com.seonhoblog.samplelogin.web;

import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.EditText;

import com.seonhoblog.samplelogin.R;

public class WebActivity extends AppCompatActivity {

    private WebView webView;
    private Handler handler = new Handler();
    private EditText etUrl;
    Button btnLoad;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web);

        btnLoad = (Button) findViewById(R.id.btn_web_load);
        etUrl = (EditText) findViewById(R.id.ev_web_load_text);
        webView = (WebView) findViewById(R.id.wv_web_webview);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        webView.setWebChromeClient(new WebBrowserClient());
        webView.addJavascriptInterface(new JavaScriptMethods(), "sample");
        webView.loadUrl("https://github.com/sleepygloa");

        btnLoad.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                webView.loadUrl(etUrl.getText().toString());
            }
        });
    }

    final class JavaScriptMethods{
        JavaScriptMethods(){

        }

        @android.webkit.JavascriptInterface
        public void clickOnFace(){
            handler.post(new Runnable() {
                @Override
                public void run() {
                    btnLoad.setText("클릭 후 열기");
                    webView.loadUrl("javascript:changeFace()");
                }
            });
        }
    }

    final class WebBrowserClient extends WebChromeClient{
        public boolean onJsAlert(WebView view, String url, String message, JsResult result){
            result.confirm();

            return true;
        }
    }

}
