from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
from datetime import date
import numpy as np
import os

def fazerNome():
	data_atual = date.today()
	data_em_texto = '{}/{}/{}'.format(data_atual.day, data_atual.month,data_atual.year)
	data_em_texto = data_em_texto.replace("/","-")
	nome="wordlcloud-"+data_em_texto
	nome +=".png"

	return nome

def plotarWordcloud(listaChamados):
	stopwords = set(STOPWORDS)
	stopwords.update(["a","o","da", "meu", "em", "de", "ao", "os", "está", "não", "muito", "para", "e", "novo", "funciona", "frequentemente", "na", "funcionando"])


	lista = listaChamados.lower()
	comment_words = str(lista)

	wordcloud = WordCloud(width = 800, height = 800,
				background_color ='white',
                stopwords = stopwords,
				min_font_size = 1).generate(comment_words)

				
	plt.figure(figsize = (8, 8), facecolor = None)
	plt.imshow(wordcloud)
	plt.axis("off")
	plt.tight_layout(pad = 0)
	etc()

	plt.savefig("site/public/assets/img/wordclouds/"+fazerNome())

def etc():
    path = "site/public/assets/img/"
    dir = os.listdir(path)
    for file in dir:
        if file == fazerNome():
            os.remove(file)