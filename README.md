# UnblockNeteaseMusic

A proxy for Netease Music...

# How to use

1. `git clone https://github.com/ITJesse/UnblockNeteaseMusic.git`
2. `npm install`
3. `npm start`

## For Windows users

Just set the proxy to 127.0.0.1:8123 on your client's settings page.

## For other users

1. Install nginx.
2. Create a new vhost with the conf file below.
3. Start nginx.
4. Add a line into /etc/hosts `music.163.com 127.0.0.1`

# Nginx conf file

```
server {
    listen 80;
    server_name music.163.com;

    location / {
        proxy_pass http://127.0.0.1:8123;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Accept-Encoding "";
    }
}
```

# Preview

![](https://dn-itjesse.qbox.me/github%2Fphoto_2016-03-31_01-11-14.jpg)

# Thanks

1. This project is based on EraserKing's [CloudMusicGear](https://github.com/EraserKing/CloudMusicGear).
2. Thanks for yanunon's [API documents](https://github.com/yanunon/NeteaseCloudMusic/wiki/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90API%E5%88%86%E6%9E%90).

# License

GPLv3
