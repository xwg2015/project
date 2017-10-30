# -*- coding: UTF-8 -*-
from bs4 import BeautifulSoup

class HtmlParser(object):

    def __init__(self):
        self.light_data = []

    def parse(self, page_url, html_cont):
        if page_url is None or html_cont is None:
            return

        soup = BeautifulSoup(html_cont, 'html.parser')

        if page_url != 'https://bbs.hupu.com/all-gambia':
            detail_data = self._get_detail_data(page_url, soup)
        else:
            detail_data = {}

        new_urls, list_data = self._get_new_urls(page_url, soup)

        return new_urls, list_data, detail_data

    def _get_new_urls(self, page_url, soup):
        list_data = []
        urls = set()

        # 获取步行街热帖列表
        list_content = soup.find(class_='list').find_all(class_='textSpan')

        for item in list_content:
            item_json = {
                'title': item.a['title'],
                'url': page_url + item.a['href'],
                'lights': item.em.string[0: item.em.string.index('亮')+1].replace('\n', ''),
                'replys': item.em.string[item.em.string.index('亮')+1:]
            }
            list_data.append(item_json)
            urls.add('/bbs' + item.a['href'])

            # 用于获取亮回帖数量
            light_json = {
                'url': '/bbs' + item.a['href'],
                'lights': item.em.string[0: item.em.string.index('亮')].replace('\n', '')
            }
            self.light_data.append(light_json)
        return urls, list_data


    def _get_length(self, page_url):
        for index in range(len(self.light_data)):
            if page_url == self.light_data[index]['url']:
                length = self.light_data[index]['lights']
                return length


    def _get_detail_data(self, page_url, soup):
        length = int(self._get_length(page_url))
        # 帖子相关内容
        content = str(soup.find(class_='article-content'))
        content_title = soup.find(class_='headline').string
        content_author = soup.find(class_='author-name').a.string
        content_time = soup.find(class_='artical-info').find(class_="times").string

        # 热帖 + 全部回帖第一页内容
        # 获取js生成html的另一种方式
        # soup.find(class_='bright-reply').find_all(class_='reply-list') 只获取到一条回帖
        comment = soup.find_all(class_='reply-list', limit=length)

        # 同上
        comment_cur = soup.find_all(class_='short-content', limit=length)

        reply_data = []

        for index in range(len(comment)):
            item_json = {
                'username': str(comment[index].find(class_='user-name')) and comment[index].find(class_='user-name').string,
                'time': str(comment[index].find(class_='times')) and comment[index].find(class_='times').string,
                'light_num': str(comment[index].find(class_='J_brightNumber')) and comment[index].find(class_='J_brightNumber').string,
                'reply_quote_hd': str(comment[index].find(class_='reply-quote-hd') and comment[index].find(class_='reply-quote-hd').get_text()),
                'reply_quote_content': str(comment[index].find(class_='short-quote-content')),
                'current_reply_content': str(comment_cur[index])
            }
            reply_data.append(item_json)

        detail_data = {
            'url': page_url,
            'content': content,
	        'title': content_title,
	        'author': content_author,
	        'time': content_time,
            'reply': reply_data
        }

        return detail_data