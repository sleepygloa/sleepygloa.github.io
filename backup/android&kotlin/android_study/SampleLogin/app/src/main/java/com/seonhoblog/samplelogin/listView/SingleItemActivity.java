package com.seonhoblog.samplelogin.listView;

public class SingleItemActivity  {

    String name;
    String mobile;
    int age;
    int resId;

    public SingleItemActivity(String name, String mobile){
        this.name = name;
        this.mobile = mobile;
    }

    public SingleItemActivity(String name, String mobile, int age, int resId){
        this.name = name;
        this.mobile = mobile;
        this.age = age;
        this.resId = resId;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getResId() {
        return resId;
    }

    public void setResId(int resId) {
        this.resId = resId;
    }
}
