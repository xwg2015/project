# -*- coding: UTF-8 -*-
import url_manager, html_downloader, html_outputer, html_parser

class SpiderMain(object):

    def __init__(self):
        self.urls = url_manager.UrlManager()
        self.downloader = html_downloader.HtmlDownloader()
        self.parser = html_parser.HtmlParser()
        self.outputer = html_outputer.HtmlOutputer()

    def craw(self, root_url):
        self.urls.add_new_url(root_url)
        while self.urls.has_new_url():
            try :
                new_url = self.urls.get_new_url()
                print('爬取中: %s' % (new_url))
                html_cont = self.downloader.download(new_url)
                new_urls, list_data, detail_data = self.parser.parse(new_url, html_cont)
                self.urls.add_new_urls(new_urls)
                self.outputer.collect_list(list_data)
                self.outputer.collect_detail(detail_data)
            except:
                print('爬取失败！')

        self.outputer.output_html()

if __name__ == '__main__':
    root_url = 'https://bbs.hupu.com/all-gambia'
    obj_spider = SpiderMain()
    obj_spider.craw(root_url)