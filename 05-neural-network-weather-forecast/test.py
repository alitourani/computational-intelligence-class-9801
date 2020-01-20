from keras.models import model_from_json
import numpy as np 

test_data= np.loadtxt('test_data.txt')
model = model_from_json(open('ann_model.json').read())
# model = model_from_json(open('model_architecture.json').read())
model.load_weights('weights.h5')
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
test_data = test_data.astype('int32')
test_data = test_data.reshape(1,12)

print (test_data)

result = model.predict(x=test_data)

print('\n',result)