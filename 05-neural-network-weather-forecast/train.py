import numpy as np 
import pandas as pd 
from keras.utils import np_utils
from sklearn.preprocessing import StandardScaler 


dataset = pd.read_csv('dataset.csv')
# print(dataset.head(10))

x = dataset.iloc[:,:12].values
y = dataset.iloc[:,12:13].values


print(len(x))
print(len(y))

sc= StandardScaler()

x1 = sc.fit_transform(x)

# # print(z)

from sklearn.preprocessing import OneHotEncoder

ohe = OneHotEncoder()
ohe.categories='auto'
z = ohe.fit_transform(y).toarray()

print (z)

from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test = train_test_split(x1,z,test_size=0.1)


from model_archi import * 
model = model_archi.build(12,4)
model.compile(loss='binary_crossentropy',
 optimizer='adam', metrics=['accuracy'])

history = model.fit(x_train, y_train, epochs=100, batch_size=10
                        , validation_data=(x_test,y_test))

print("-----------------"+"\n")

scores = model.evaluate(x_test, y_test, verbose=0)

print("\n")
print("%s: %.2f%%" % (model.metrics_names[1], scores[1]*100))

y_pred = model.predict(x_test)
pred = list()
for i in range (len(y_pred)):
    pred.append(np.argmax(y_pred[i]))
    test = list()
for i in range (len(y_test)):
    test.append(np.argmax(y_test[i]))

from sklearn.metrics import accuracy_score
a = accuracy_score(pred,test)
print('Accuracy is:', a*100)

# import matplotlib.pyplot as plt
# plt.plot(history.history['acc'])
# plt.plot(history.history['val_acc'])
# plt.title('Model accuracy')
# plt.ylabel('Accuracy')
# plt.xlabel('Epoch')
# plt.legend(['Train', 'Test'], loc='upper left')
# plt.show()

# plt.plot(history.history['loss'])
# plt.plot(history.history['val_loss']) 
# plt.title('Model loss') 
# plt.ylabel('Loss') 
# plt.xlabel('Epoch') 
# plt.legend(['Train', 'Test'], loc='upper left') 
# plt.show()


model_json = model.to_json()
open('ann_model.json', 'w').write(model_json)
model.save_weights('weights.h5',overwrite=True)