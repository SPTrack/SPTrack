from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
from datetime import date
import numpy as np
import os


def plotarWordcloud(listaChamados):
    stopwords = set(STOPWORDS)
    stopwords.update(["aluno", "pegou", "sala", "notebook", "computador", "sem", "a", "o", "da", "meu", "em", "de", "ao", "os", "está", "não", "muito",
                     "para", "e", "novo", "funciona", "frequentemente", "na", "funcionando", "funcionar", "pouco", "aula", "parou", "tem", "faz", "quebrou"])

    lista = listaChamados.lower()
    comment_words = str(lista)

    wordcloud = WordCloud(width=800, height=800,
                          background_color='white',
                          stopwords=stopwords,
                          min_font_size=1).generate(comment_words)

    plt.rc('figure', max_open_warning=0)
    plt.figure(figsize=(8, 8), facecolor=None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad=0)
    etc()

    plt.savefig("../site/public/assets/img/wordclouds/"+"wordcloudChamados")


def etc():
    path = "../site/public/assets/img/"
    dir = os.listdir(path)
    for file in dir:
        if file == "wordcloudChamados":
            os.remove(file)
