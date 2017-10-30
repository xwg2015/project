# -*- coding: UTF-8 -*
import time
class HtmlOutputer(object):

    def __init__(self):
        self.bbs_detail = []
        self.bbs_list = []

    def collect_detail(self, detail):
        if detail is None:
            return
        self.bbs_detail.append(detail)

    def collect_list(self, list):
       if list is None:
           return
       self.bbs_list.append(list)

    def output_html(self):
        data = {
            'list_data': self.bbs_list,
            'detail_data': self.bbs_detail,
            'time': time.time()
        }
        fw = open('./data.json', 'w', encoding='utf-8')
        print(data, file=fw)
        fw.close()