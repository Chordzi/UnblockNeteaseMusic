# UnblockNeteaseMusic

一个基于 koa 的网易云音乐的代理……

English version [here](https://github.com/ITJesse/UnblockNeteaseMusic/blob/master/README_en.md).

# 依赖

1. Node.js 4.x+

# 使用方法

1. `npm install unblock-netease-music -g`
2. `unblockneteasemusic`

## 配置参数

```
unblockneteasemusic -h

  Usage: unblockneteasemusic [options]

  Options:

    -h, --help           output usage information
    -p, --port <port>    Specific server port.
    -f, --force-ip <ip>  Force the netease server ip.
```

## Windows 用户

在客户端中设置代理为 `127.0.0.1:8123`，并重启客户端

## 其他用户

1. 向 /etc/hosts 文件中添加一行：`127.0.0.1 music.163.com`
2. 使用 80 端口启动代理服务 `sudo unblockneteasemusic -p 80`

## 使用 nginx 反代

1. 安装 nginx
2. 使用下面的配置新建一个 vhost
3. 启动 nginx.
4. 向 /etc/hosts 文件中添加一行：`127.0.0.1 music.163.com`

# Nginx 配置

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

# 搭建自己的代理服务器

1. 安装 nginx 和 Node.js
2. Nginx 配置如下

  ```
  server {
      listen 80;
      server_name music.163.com;

      location / {
          if ($http_host !~* ^(music.163.com)$){
              return 500;
          }
          proxy_pass http://localhost:8123;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header Accept-Encoding "";
      }
  }
  ```

3. 安装 sniproxy，配置如下

  ```
  user daemon
  pidfile /var/run/sniproxy.pid

  error_log {
      syslog daemon
      priority notice
  }

  listen <YOUR_SERVER_IP>:443 {
      proto tls
      table https_hosts

      access_log {
          filename /var/log/sniproxy/https_access.log
          priority notice
      }
      fallback 127.0.0.1:443
  }

  table https_hosts {
      music.163.com 223.252.199.7:443
  }
  ```

4. 安装本代理 `sudo npm install unblock-netease-music -g`
5. 运行 `unblockneteasemusic`.
6. 完成！

# 预览

![](https://dn-itjesse.qbox.me/github%2Fphoto_2016-03-31_01-11-14.jpg)

# 感谢

1. 这个项目最初的想法及实现来源于 EraserKing 的 [CloudMusicGear](https://github.com/EraserKing/CloudMusicGear).
2. 感谢 yanunon 的 API 文档 [API documents](https://github.com/yanunon/NeteaseCloudMusic/wiki/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90API%E5%88%86%E6%9E%90).
3. 感谢 Chion82 的配置文件

# License

GPLv3
