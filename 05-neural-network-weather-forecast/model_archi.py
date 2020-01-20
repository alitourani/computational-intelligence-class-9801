import keras
from keras.models import Sequential
from keras.layers import Dense


class model_archi:
    def __init__(self):
        pass
    def build(input, classes):

        model = Sequential()
        model.add(Dense(16,input_dim=input,activation='relu'))
        model.add(Dense(12,activation='relu'))
        model.add(Dense(classes,activation='softmax'))
        
        return model
