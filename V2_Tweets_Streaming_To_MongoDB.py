# -*- coding: utf-8 -*-
"""
Created on Thu Nov 12 20:26:36 2020
@author: Jacinto Mata
"""

import tweepy
#from tweepy import StreamListener
import json
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import datetime
from keys import *


class MiClaseTwitter(tweepy.StreamingClient):

    def __init__(self, bearer_token, bd, limite):
        tweepy.StreamingClient.__init__(self, bearer_token=bearer_token)
        self.contador = 0
        self.limite = limite
        self.coleccion = bd.tweets
        
    def on_connection_error(self):
        self.disconnect()
    
    def on_connect(self):
        print("Conexión correcta!!!!")

    
    def on_data(self, data):
        if self.contador < self.limite:
            tweet = json.loads(data)
            self.coleccion.insert_one(tweet)
            self.contador += 1
        else:
            print('Límite de tweets alcanzado')
            self.disconnect()


    def on_error(self, status_code):
        print("Error", status_code)

if __name__ == '__main__':

    # Si queremos conectarnos a un cluster de Atlas, se usa la misma cadena que para conectarse desde los programas (Compass, Studio 3T, etc.)
    # En este caso se conecta a un cluster "local" en el que uno de los nodos "escucha" por el puerto 27000
    stringConexion='mongodb://localhost:27000'

    #   !!!!!!  IMPORTANTE  !!!!!!
    #   La cadena de conexión anterior la cambie por la cadena de conexión a mi base de datos Atlas con la autenticación correspondiente
    #   No añado dicha cadena por cuestiones de seguridad

    try:

        cliente = MongoClient(stringConexion)
        limite = 4
        bd = cliente.Twitter
        MiStream = MiClaseTwitter(bearer_token=bearer_token, bd=bd, limite=limite)
        
        print(MiStream.get_rules())

        # Se borran las reglas anteriores si las hubiera
        reglasAnteriores = MiStream.get_rules().data
        if reglasAnteriores:
            MiStream.delete_rules(reglasAnteriores)
        else:
            print("No hay reglas que borrar")

        MiStream.add_rules(tweepy.StreamRule('lang:en OR lang:es'))
        MiStream.add_rules(tweepy.StreamRule('("messi" OR "cristiano")'))
        reglas = MiStream.get_rules()

        if reglas.data != None:
            MiStream.filter(
              tweet_fields=["created_at", "lang", "source", "public_metrics", "entities","referenced_tweets"], 
              expansions=["author_id", "referenced_tweets.id", "geo.place_id", "entities.mentions.username"], 
              user_fields=["username", "name", "created_at", "entities", "public_metrics", "description", "location", "verified"],
              place_fields=["full_name", "country", "geo", "name"]
            )
        else:
            print('Condiciones de búsqueda incorrectas')

    except ConnectionFailure:
        print('Failed to connect to replicaSet')

