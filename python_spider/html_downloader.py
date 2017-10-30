# -*- coding: UTF-8 -*-
import urllib.request
from hyper import HTTP20Connection

class HtmlDownloader(object):
    def download(self, url):
        if url is None:
            return None
        # 请求头
        headers = {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'ezh-CN,zh;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'cache-control': 'max-age=0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'referer': 'https://m.hupu.com/bbs/34',
            'origin': 'http://evil.com/',
            'upgrade-insecure-requests': '1',
            'cookie': 'PHPSESSID=7f5cac926cab7ced604d0bd208e80e4c; _dacevid3=b6cab133.d89c.f262.1678.036335053378; __gads=ID=9561fde42d366d3d:T=1507386616:S=ALNI_Mb6QIOhcg-0tuBB6GyP52NPMrOhfg; _HUPUSSOID=66d8269e-42de-4bdf-9afc-34ccd00cc965; _CLT=b0c2a05996d8b48b354e1fa4ddfc1fef; u=29212169|5YmNMjAw5ZCN5YWo5piv5pys5a2Q5ZWK|25f3|ad13b3e16c7eec499215acfd69caabba|6c7eec499215acfd|aHVwdV80ZGVhMGNiZDE5OGYxOWM3; us=530996ddff0a514f011a9568aec9b739179a76d3a9b8c19c5f15fbe488e3665005088f9cef229046a7bd669f44c2649f9d417ac0286c3c093fdd870d59046dd4; ua=21537390; __dacevst=1b2cee4d.bfc6e0c0|1507619155528; _cnzz_CV30020080=buzi_cookie%7Cb6cab133.d89c.f262.1678.036335053378%7C-1; Hm_lvt_39fc58a7ab8a311f2f6ca4dc1222a96e=1507560101,1507564855,1507617329,1507617337; Hm_lpvt_39fc58a7ab8a311f2f6ca4dc1222a96e=1507617356; _fmdata=6DA37EF709ADE6CF923318742DDF012CBD9EEB085D6EBC7E45DD720AF4E89DB8FD95D15D3C12DEF1574F45307A8A7C3106F5DD30F51729F5'
        }

        if url != 'https://bbs.hupu.com/all-gambia':
            # 帖子详情需要带上请求头，模拟浏览器访问
            # 且支持HTTP2
            connect = HTTP20Connection(host='m.hupu.com', secure=True)
            response_tmp = connect.request('GET', url, headers=headers)
            response = connect.get_response(response_tmp)
            if response.status != 200:
                return None
        else:
            response = urllib.request.urlopen(url)
            if response.getcode() != 200:
                return None

        return response.read()